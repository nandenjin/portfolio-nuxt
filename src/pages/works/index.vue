<template>
  <main class="main main-with-margin">
    <content-list v-if="pages" :src="pages" />
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  useFetch,
  useMeta
} from '@nuxtjs/composition-api'
import ContentList from '~/components/ContentList.vue'
import { NuxtRootContext } from '~/types'

interface Page {
  body
}

export default defineComponent({
  name: 'WorksIndexPage',
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

    const state = reactive<{ pages: Page[] | null }>({ pages: null })

    const { $content } = useContext() as NuxtRootContext
    const { fetch } = useFetch(async () => {
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
      state.pages = await Promise.all(
        items.map(
          path =>
            $content(path.replace(/\.md$/, '')).fetch<Page>() as Promise<Page>
        )
      )
      console.log(state.pages)
    })

    fetch()

    return state
  },
  head: {}
})
</script>
