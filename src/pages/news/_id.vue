<template>
  <main class="main theme--document">
    <h1 class="title theme--title">
      {{ page.title_ja }}
    </h1>

    <content-renderer :content="page" />
    <div class="footer">
      <p>{{ page.release }}</p>
    </div>
  </main>
</template>

<script lang="ts">
  /* eslint camelcase: 0 */

  import { Vue, Component } from 'nuxt-property-decorator'
  import { WorkMeta } from '~/types'
  import ContentRenderer from '~/components/ContentRenderer'

  interface Page extends WorkMeta {
    body: Object
  }

  @Component({
    async asyncData ({ route, $content }) {
      const id = route.params.id
      const page = await $content('pages/news', id).fetch<Page>()

      return {
        page
      }
    },

    components: {
      ContentRenderer
    },

    head (this: NewsPage) {
      return {
        title: `${this.page.title_ja} / ${this.page.title_en}`,

        meta: [
          // ToDo: Description整備
          { hid: 'og:description', property: 'og:description', content: '' },
          { hid: 'og:title', property: 'og:title', content: `${this.page.title_ja} / ${this.page.title_en} - Kazumi Inada` },
          { hid: 'og:description', property: 'og:description', content: '' }
        ]
      }
    }
  })
  export default class NewsPage extends Vue {
    page!: Page
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
