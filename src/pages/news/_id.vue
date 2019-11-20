
<template>
  <main class="main theme--document">
    <h1 class="title theme--title">
      {{ title_ja }}
    </h1>

    <div class="theme-text" v-html="content" />
    <div class="footer">
      <p>{{ release }}</p>
    </div>
  </main>
</template>

<script lang="ts">
  /* eslint camelcase: 0 */

  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class NewsPage extends Vue {
    title_ja! :string
    title_en! :string
    content!: string

    async asyncData ({ payload, getContent, route, error }: any) {
      const data = payload || await getContent(route.path) || {}

      if (!data) {
        error({ statusCode: 404 })
        return
      }

      return {
        ...data
      }
    }

    head (this: NewsPage) {
      return {
        title: `${this.title_ja} / ${this.title_en}`,

        meta: [
          { hid: 'og:description', property: 'og:description', content: this.content.replace(/<.+?>/g, '').replace(/\n/g, ' ') },
          { hid: 'og:title', property: `${this.title_ja} / ${this.title_en} - Kazumi Inada` },
          { hid: 'og:description', property: 'og:description', content: this.content.replace(/<.+?>/g, '').replace(/\n/g, ' ') }
        ]
      }
    }
  }

</script>

<style lang="sass">

    @import '~/assets/style/themes.sass'
    @import '~/assets/style/media.sass'

    .main

      .theme--title
        font-size: 20px

        +rmq
          text-align: left

      .footer
        max-width: 800px
        margin: 40px auto
        font-size: 14px
        color: #888

        p
          font-family: Helvetica

</style>
