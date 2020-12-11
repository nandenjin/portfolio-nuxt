<template>
  <main class="main main-with-margin">
    <content-list :src="pages" />
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  useMeta
} from '@nuxtjs/composition-api'
import ContentList from '~/components/ContentList.vue'
import { NuxtRootContext } from '~/types'

interface Page {
  body
}

export default defineComponent({
  components: { ContentList },
  setup() {
    useMeta({
      title: 'Works',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Works - Kazumi Inada'
        }
      ]
    })

    const { $content } = useContext() as NuxtRootContext
    const pages = useAsync(async () => {
      const src = (await $content('pages/works/index').fetch<Page>()) as Page
      const items: string[] = []
      const proc = node => {
        if (node.type === 'text') {
          return
        }
        if (node.tag === 'nuxt-link') {
          items.push(node.props.to)
        }
        for (const c of node.children) {
          proc(c)
        }
      }
      proc(src.body)
      return await Promise.all(
        items.map(path => $content(path.replace(/\.md$/, '')).fetch())
      )
    })

    return {
      pages
    }
  },
  head: {}
})
</script>
