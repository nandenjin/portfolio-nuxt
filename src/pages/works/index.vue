
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
  import ContentList from '~/components/ContentList.vue'

  @Component({
    components: {
      ContentList
    },
    async asyncData({ getContent, payload, route }: any) {
      return { works: payload || await getContent(route.path) }
    },
    head: {
      title: 'Works',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Works' }
      ]
    }
  })
  export default class WorksIndexPage extends Vue {
  }
</script>
