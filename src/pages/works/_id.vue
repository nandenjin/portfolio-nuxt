<template>
  <main class="main theme--document">
    <h1 class="title theme--title">
      {{ page.title_ja }}
    </h1>

    <section class="content theme-text">
      <content-renderer :content="page" />
    </section>
    <section class="info">
      <div class="text">
        <p class="aside">
          {{ page.materials }}
        </p>
        <p class="creator">{{ meta.creator }}, {{ meta.year }}</p>
        <p v-if="$data.meta.info">
          {{ meta.info }}
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
import ContentRenderer from '~/components/ContentRenderer'

@Component({
  async asyncData({ route, $content }) {
    const id = route.params.id
    const page = await $content('pages/works', id).fetch()

    return {
      page
    }
  },

  components: {
    ContentRenderer
  },

  head(this: WorkPage) {
    return {
      title: `${this.page.title_ja} / ${this.page.title_en}`,

      meta: [
        // ToDo: description実装
        { hid: 'description', property: 'description', content: '' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.page.title_ja} / ${this.page.title_en} - Kazumi Inada`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.baseUrl + this.page.thumbnail
        },
        { hid: 'og:description', property: 'og:description', content: '' },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  }
})
export default class WorkPage extends Vue {
  page

  get tagArray(): string[] {
    if (!this.page.tags) {
      return []
    }
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
    max-width: 800px
    margin: 100px auto
    font-size: 13px
    line-height: 1.8em
    color: #888

    .text
      p
        margin: 5px 0

    .tags
      margin: 30px 0 0 0
      padding: 0

      .tag
        display: inline-block
        margin: 0 10px 6px 0
        font-family: Helvetica
        font-size: 12px
        color: #888
</style>
