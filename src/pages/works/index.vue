
<template>
  <main class="theme--document">
    <content-list class="theme-margin-lr" :src="works" />
  </main>
</template>

<style lang="sass" scoped>

  @import '~/assets/style/themes.sass'

</style>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { getPagesByIndex } from '../../lib'
  import ContentList from '~/components/ContentList.vue'

  @Component({
    components: {
      ContentList
    },
    async asyncData () {
      const data = await import('~/../tmp/contents/json/pages/works/index.json')
      return { works: await getPagesByIndex(data.default._content) }
    },
    head: {
      title: 'Works',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Works - Kazumi Inada' }
      ]
    }
  })
  export default class WorksIndexPage extends Vue {
  }
</script>
