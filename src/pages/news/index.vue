
<template>
  <main class="theme--document">
    <ul class="link-list theme-margin-lr">
      <nuxt-link v-for="item in items" :key="item.title_ja" :to="item.url" tag="li" class="item">
        <span class="title">{{ item.title_ja }}</span>
        <span class="date">{{ item.release }}</span>
      </nuxt-link>
    </ul>
  </main>
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'
  import LinkList from '~/components/LinkList.vue'

  @Component({
    components: {
      LinkList
    },

    async asyncData({ getContent, payload, route }: any) {
      return {
        items: payload || await getContent(route.path)
      }
    }
  })
  export default class NewsIndexPage extends Vue {
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
