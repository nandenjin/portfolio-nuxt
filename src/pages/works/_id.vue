
<template>
  <main class="main theme--document">
    <h1 class="title theme--title">
      {{ title_ja }}
    </h1>

    <section class="content theme-text" v-html="content" />
    <section class="info">
      <h2>Info</h2>
      <div class="text">
        <p class="title">
          {{ title_ja }} / {{ title_en }}
        </p>
        <p class="aside">
          {{ materials }}
        </p>
        <p class="creator">
          {{ creator }}, {{ year }}
        </p>
        <p v-if="$data.info">
          {{ info }}
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

  @Component({
    async asyncData({ route, payload, getContent, error }: any) {
      const data = payload || await getContent(route.path)
      if (!data) error({ statusCode: 404 })

      return {
        ...data
      }
    },

    head(this: WorkPage) {
      return {
        title: `${this.title_en} / ${this.title_ja} - Kazumi Inada Portfolio`
      }
    }
  })
  export default class WorkPage extends Vue {
    title_ja?: string
    title_en?: string
    content?: string
    materials?: string
    year?: string
    info?: string
    tags?: string

    get tagArray(): string[] {
      if (!this.tags) return []
      return this.tags.split(' ')
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
      margin: auto 15px
      padding: 30px 25px
      font-size: 13px
      line-height: 1.8em
      background-color: #fafafa
      border-radius: 10px

      +mq(md)
        display: grid
        grid-template-columns: 70px 1fr
        grid-gap: 60px
        margin: auto
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
          margin: 0 6px
          padding: 3px 15px
          border-radius: 5px
          font-family: Helvetica
          font-size: 12px
          text-transform: uppercase
          color: #444
          background-color: #ddd

          &:first-child
            margin: 0

</style>
