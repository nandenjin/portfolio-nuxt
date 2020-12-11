<template>
  <main class="main doc">
    <div class="header">
      <h1 class="title">
        {{ page.title_ja }}
      </h1>
      <div class="info">
        {{ page.creator }}, {{ page.year }} / {{ page.materials }}
      </div>
    </div>

    <section class="content">
      <content-renderer :content="page" />
    </section>
    <section class="work-info">
      <div class="text">
        <p class="aside">
          {{ page.materials }}
        </p>
        <p class="creator">{{ page.creator }}, {{ page.year }}</p>
        <p v-if="page.info">
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

import {
  computed,
  defineComponent,
  useAsync,
  useContext,
  useMeta
} from '@nuxtjs/composition-api'
import ContentRenderer from '~/components/ContentRenderer'
import { NuxtRootContext, WorkMeta } from '~/types'

export default defineComponent({
  components: { ContentRenderer },
  setup() {
    const { route, $content } = useContext() as NuxtRootContext

    const page = useAsync(() => {
      const id = route.value.params.id
      return $content('pages/works', id).fetch<WorkMeta>() as Promise<WorkMeta>
    })

    useMeta({
      title: `${page.value?.title_ja} / ${page.value?.title_en}`,

      meta: [
        // ToDo: description実装
        { hid: 'description', property: 'description', content: '' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${page.value?.title_ja} / ${page.value?.title_en} - Kazumi Inada`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: (process.env.baseUrl || '') + page.value?.thumbnail
        },
        { hid: 'og:description', property: 'og:description', content: '' },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    })

    return { page, tagArray: computed(() => page.value?.tags?.split(',')) }
  },
  head: {}
})
</script>

<style lang="sass">

@import '~/assets/style/media.sass'

.main

  .eye-catch
    margin-top: 15px
    margin-bottom: 15px
    border-radius: 20px

    @include mq(md)
      margin-top: 85px
      margin-bottom: 85px

  .work-info
    max-width: 700px
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
