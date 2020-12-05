
<template>
  <main class="theme--document">
    <content-list :src="pages" />
  </main>
</template>

<style lang="sass" scoped>

  @import '~/assets/style/themes.sass'

</style>

<script lang="ts">
  import { IContentDocument } from '@nuxt/content/types/content'
  import { Vue, Component } from 'vue-property-decorator'
  import ContentList from '~/components/ContentList.vue'

  interface Page {
    body
  }

  @Component({
    async asyncData ({ $content }) {
      const src = await $content('pages/works/index').fetch<Page>() as (Page & IContentDocument)
      const items: any[] = []
      const proc = (node) => {
        if (node.type === 'text') { return }
        if (node.tag === 'nuxt-link') {
          items.push(node.props.to)
        }
        for (const c of node.children) { proc(c) }
      }
      proc(src.body)

      return { pages: await Promise.all(items.map(path => $content(path.replace(/\.md$/, '')).fetch())) }
    },
    head: {
      title: 'Works',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Works - Kazumi Inada' }
      ]
    },
    components: { ContentList }
  })
  export default class WorksIndexPage extends Vue {
  }
</script>
