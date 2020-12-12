<template>
  <main class="main doc">
    <div v-if="page" class="header">
      <h1 class="title">
        {{ page.title_ja }}
      </h1>
      <div class="info">{{ page.release }}</div>
    </div>

    <section class="content">
      <content-renderer v-if="page" :content="page" />
    </section>
    <div v-if="page" class="footer">
      <div class="gray">{{ page.release }}</div>
    </div>
  </main>
</template>

<script lang="ts">
/* eslint camelcase: 0 */

import {
  defineComponent,
  useContext,
  useMeta,
  useFetch,
  reactive
} from '@nuxtjs/composition-api'
import ContentRenderer from '~/components/ContentRenderer'
import { NuxtRootContext, WorkMeta } from '~/types'

export default defineComponent({
  name: 'NewsItemPage',
  components: {
    ContentRenderer
  },
  setup() {
    const { route, $content } = useContext() as NuxtRootContext
    const id = route.value.params.id
    const state = reactive<{ page: WorkMeta | null }>({ page: null })
    const { fetch } = useFetch(async () => {
      state.page = (await $content('pages/news', id).fetch<
        WorkMeta
      >()) as WorkMeta
    })

    fetch()

    useMeta(() => ({
      title: `${state.page?.title_ja} / ${state.page?.title_en}`,

      meta: [
        // ToDo: Description整備
        { hid: 'og:description', property: 'og:description', content: '' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${state.page?.title_ja} / ${state.page?.title_en} - Kazumi Inada`
        },
        { hid: 'og:description', property: 'og:description', content: '' }
      ]
    }))

    return state
  },
  head: {}
})
</script>
