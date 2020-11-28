
<template>
  <main class="main theme--document">
    <h1 class="title theme--title">
      {{ page.title_ja }}
    </h1>

    <section class="content theme-text">
      <content-renderer :content="page"/>
    </section>
    <section class="info">
      <h2>Info</h2>
      <div class="text">
        <p class="title">
          {{ page.title_ja }} / {{ page.title_en }}
        </p>
        <p class="aside">
          {{ page.materials }}
        </p>
        <p class="creator">
          {{ page.creator }}, {{ page.year }}
        </p>
        <p v-if="$data.page.info">
          {{ page.info }}
        </p>
        <ul class="tags">
          <li v-for="tag in tagArray" :key="tag" class="tag">
            {{ tag }}
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
  /* eslint camelcase: 0 */

  import { Vue, Component } from 'vue-property-decorator'
  import { WorkMeta } from '~/types'
  import ContentRenderer from '~/components/ContentRenderer'

  interface Page extends WorkMeta {
    body: Object
  }

  @Component({
    async asyncData ({ route, $content }) {
      const id = route.params.id
      const page = await $content('pages/works', id).fetch<Page>()

      return {
        page
      }
    },

    components: {
      ContentRenderer
    },

    head (this: WorkPage) {
      return {
        title: `${this.page.title_ja} / ${this.page.title_en}`,

        meta: [
          // ToDo: description実装
          { hid: 'description', property: 'description', content: '' },
          { hid: 'og:title', property: 'og:title', content: `${this.page.title_ja} / ${this.page.title_en} - Kazumi Inada` },
          { hid: 'og:image', property: 'og:image', content: process.env.baseUrl + this.page.thumbnail },
          { hid: 'og:description', property: 'og:description', content: '' },
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
        ]
      }
    }
  })
  export default class WorkPage extends Vue {
    page!: Page

    get tagArray (): string[] {
      if (!this.page.tags) { return [] }
      return this.page.tags.split(' ')
    }
  }

</script>

<style lang="sass">

  @import '~/assets/style/themes.sass'
  @import '~/assets/style/media.sass'

  .main

    .eye-catch
      margin-top: 15px
      margin-bottom: 15px
      border-radius: 20px

      @include mq(md)
        margin-top: 85px
        margin-bottom: 85px

    .info
      max-width: 780px
      margin: 100px 15px auto 15px
      padding: 30px 25px
      font-size: 13px
      line-height: 1.8em
      background-color: #fafafa
      border-radius: 10px

      +mq(md)
        display: grid
        grid-template-columns: 70px 1fr
        grid-gap: 60px
        margin: 150px auto 100px auto
        padding: 50px 40px 50px 20px
        border-radius: 20px

      h2
        margin: 0
        padding-top: 15px
        font-size: 30px
        writing-mode: vertical-rl
        text-transform: uppercase
        font-family: Helvetica
        letter-spacing: .3em

        +rmq
          margin: 0 0 30px 0
          font-size: 20px
          writing-mode: horizontal-tb

      .text
        p
          margin: 5px 0

      .tags
        margin: 30px 0 0 0
        padding: 0

        .tag
          display: inline-block
          margin: 0 6px 6px 0
          padding: 3px 15px
          border-radius: 5px
          font-family: Helvetica
          font-size: 12px
          text-transform: uppercase
          color: #444
          background-color: #ddd

</style>
