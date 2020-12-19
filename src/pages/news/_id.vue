<template>
  <main class="main doc">
    <div class="header">
      <h1 class="title">
        {{ page.title_ja }}
      </h1>
      <div class="info">{{ page.release }}</div>
    </div>

    <section class="content">
      <content-renderer :content="page" />
    </section>
    <div class="footer">
      <div class="gray">{{ page.release }}</div>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <script type="application/ld+json" v-html="JSON.stringify(jsonLD)" />
  </main>
</template>

<script lang="ts">
/* eslint camelcase: 0 */

import { Vue, Component } from 'nuxt-property-decorator'
import ContentRenderer from '~/components/ContentRenderer'

@Component({
  async asyncData({ route, $content }) {
    const id = route.params.id
    const page = await $content('pages/news', id).fetch()

    return {
      page
    }
  },

  components: {
    ContentRenderer
  },

  head(this: NewsPage) {
    return {
      title: `${this.page.title_ja} / ${this.page.title_en}`,

      meta: [
        // ToDo: Description整備
        { hid: 'og:description', property: 'og:description', content: '' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.page.title_ja} / ${this.page.title_en} - Kazumi Inada`
        },
        { hid: 'og:description', property: 'og:description', content: '' }
      ]
    }
  }
})
export default class NewsPage extends Vue {
  page

  get jsonLD(): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: this.page.title_ja,
      dateModified: new Date(this.page.release).toISOString()
    }
  }
}
</script>
