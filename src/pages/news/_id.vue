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
  </main>
</template>

<script lang="ts">
/* eslint camelcase: 0 */

import {
  defineComponent,
  useAsync,
  useContext,
  useMeta
} from '@nuxtjs/composition-api'
import ContentRenderer from '~/components/ContentRenderer'
import { NuxtRootContext, WorkMeta } from '~/types'

export default defineComponent({
  components: {
    ContentRenderer
  },
  setup() {
    const { route, $content } = useContext() as NuxtRootContext
    const page = useAsync(() => {
      const id = route.value.params.id
      return $content('pages/news', id).fetch<WorkMeta>() as Promise<WorkMeta>
    })
    useMeta({
      title: `${page.value?.title_ja} / ${page.value?.title_en}`,

      meta: [
        // ToDo: Description整備
        { hid: 'og:description', property: 'og:description', content: '' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${page.value?.title_ja} / ${page.value?.title_en} - Kazumi Inada`
        },
        { hid: 'og:description', property: 'og:description', content: '' }
      ]
    })

    return { page }
  },
  head: {}
})
</script>
