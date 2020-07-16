<template>
  <main class="main theme--document">
    <h1 class="title theme--title">
      {{ meta.title_ja }}
    </h1>

    <content-renderer class="theme-text" :content="content" />
    <div class="footer">
      <p>{{ meta.release }}</p>
    </div>
  </main>
</template>

<script lang="ts">
/* eslint camelcase: 0 */

import { Vue, Component } from 'nuxt-property-decorator'
import { WorkMeta } from '~/types'
import ContentRenderer from '~/components/ContentRenderer.vue'

@Component({
  async asyncData({ route, error }) {
    const id = route.params.id
    const data = await import(
      `~/../../../tmp/contents/json/pages/news/${id}.json`
    )

    if (!data) {
      error({ statusCode: 404 })
      return
    }

    return {
      meta: data.default.meta,
      content: data.default._content,
    }
  },

  components: {
    ContentRenderer,
  },

  head(this: NewsPage) {
    return {
      title: `${this.meta.title_ja} / ${this.meta.title_en}`,

      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.content.replace(/<.+?>/g, '').replace(/\n/g, ' '),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.meta.title_ja} / ${this.meta.title_en} - Kazumi Inada`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.content.replace(/<.+?>/g, '').replace(/\n/g, ' '),
        },
      ],
    }
  },
})
export default class NewsPage extends Vue {
  meta!: WorkMeta
  content!: string
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
