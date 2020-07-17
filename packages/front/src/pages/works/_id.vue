<template>
  <main class="main theme--document">
    <h1 class="title theme--title">
      {{ meta.title_ja }}
    </h1>

    <section class="content theme-text">
      <content-renderer :content="content" />
    </section>
    <section class="info">
      <div class="text">
        <p class="aside">
          {{ meta.materials }}
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
import { WorkMeta } from '~/types'
import ContentRenderer from '~/components/ContentRenderer.vue'

@Component({
  async asyncData({ route }) {
    const id = route.params.id
    const data = await import(
      `~/../../../tmp/contents/json/pages/works/${id}.json`
    )

    return {
      meta: data.default.meta,
      content: data.default._content,
    }
  },

  components: {
    ContentRenderer,
  },

  head(this: WorkPage) {
    return {
      title: `${this.meta.title_ja} / ${this.meta.title_en}`,

      meta: [
        {
          hid: 'description',
          property: 'description',
          content: this.content.replace(/<.+?>|\n/g, '').replace(/\n/g, ' '),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.meta.title_ja} / ${this.meta.title_en} - Kazumi Inada`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.baseUrl + this.meta.thumbnail,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.content.replace(/<.+?>|\n/g, '').replace(/\n/g, ' '),
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },
})
export default class WorkPage extends Vue {
  meta!: WorkMeta
  content!: string

  get tagArray(): string[] {
    if (!this.meta.tags) {
      return []
    }
    return this.meta.tags.split(' ')
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
