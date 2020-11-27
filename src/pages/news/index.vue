
<template>
  <main class="theme--document">
    <link-list :items="pages.map(p => ({title: p.title_ja, to: p.path}))"></link-list>
  </main>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import LinkList from '~/components/LinkList.vue'

  interface Page {
    body: Object
  }

  @Component({
    components: {
      LinkList
    },

    async asyncData ({ $content }) {
      const src = await $content('pages/news/index').fetch<Page>()
      const items: any[] = []
      const proc = node => {
        if (node.type === 'text') return
        if (node.tag === 'nuxt-link') {
          items.push(node.props.to)
        }
        for (const c of node.children) proc(c)
      }
      console.log(src)
      proc(src.body)

      const pages = await Promise.all(
        items.map(
          path => $content(path.replace(/\.md$/, '')).fetch()
        )
      )

      return { pages }
    },

    head () {
      return {
        title: 'News',
        meta: [
          { hid: 'og:title', property: 'og:title', content: 'News - Kazumi Inada' }
        ]
      }
    }
  })
  export default class NewsIndexPage extends Vue {
    pages!: any[]
  }

</script>

<style lang="sass" scoped>

  @import '~/assets/style/media.sass'
  @import '~/assets/style/themes.sass'

  .link-list
    padding: 0
    list-style: none

    .item
      display: flex
      padding: 20px 30px
      font-size: 13px
      line-height: 2em
      border: 1px solid #eee
      border-style: solid none
      cursor: pointer

      +rmq
        display: block
        padding: 20px 15px

      .title
        display: block
        flex: 1 1 auto

      .date
        display: block
        flex: 0 0 auto
        color: #888
        font-family: Helvetica

      &+.item
        border-top: none

</style>
