<template>
  <main class="theme--document">
    <ul class="link-list">
      <nuxt-link
        v-for="item in items"
        :key="item.name"
        :to="item.path.replace(/^\/pages/, '')"
        tag="li"
        class="item"
      >
        <span class="title">{{ item.meta.title_ja }}</span>
        <span class="date">{{ item.meta.release.replace(/T.+$/, '') }}</span>
      </nuxt-link>
    </ul>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import LinkList from '~/components/LinkList.vue'
import { getPagesByIndex } from '~/lib'

@Component({
  components: {
    LinkList,
  },

  async asyncData() {
    const indexData = await import(
      '~/../../../tmp/contents/json/pages/news/index.json'
    )

    return {
      items: await getPagesByIndex(indexData.default.html),
    }
  },

  head() {
    return {
      title: 'News',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'News - Kazumi Inada',
        },
      ],
    }
  },
})
export default class NewsIndexPage extends Vue {}
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
