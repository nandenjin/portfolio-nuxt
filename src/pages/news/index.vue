<template>
  <main class="theme--document">
    <ul class="link-list">
      <li class="item">
        <nuxt-link
          v-for="item in pages"
          :key="item.name"
          :to="item.path.replace(/^\/pages/, '')"
          class="item-content"
        >
          <span class="title">{{ item.title_ja }}</span>
          <span class="date">{{ item.release.replace(/T.+$/, '') }}</span>
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  async asyncData({ $content }) {
    const src = (await $content('pages/news/index').fetch()) as IContentDocument
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

    const pages = await Promise.all(
      items.map(path => $content(path.replace(/\.md$/, '')).fetch())
    )

    return { pages }
  },

  head() {
    return {
      title: 'News',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'News - Kazumi Inada'
        }
      ]
    }
  }
})
export default class NewsIndexPage extends Vue {
  pages
}
</script>

<style lang="sass" scoped>

@import '~/assets/style/media.sass'
@import '~/assets/style/themes.sass'

.link-list
  padding: 0
  list-style: none

  .item
    font-size: 13px
    line-height: 2em
    border: 1px solid #eee
    border-style: solid none
    cursor: pointer

    .item-content
      display: flex
      padding: 20px 30px
      color: inherit

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
</style>
