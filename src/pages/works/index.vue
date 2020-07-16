
<template>
  <main class="theme--document">
    <nuxt-content :document="page" />
  </main>
</template>

<style lang="sass" scoped>

  @import '~/assets/style/themes.sass'

</style>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  interface Page {
    body
  }

  @Component({
    async asyncData ({ $content }) {
      const page = await $content('pages/works/index').fetch<Page>()
      return { page }
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
