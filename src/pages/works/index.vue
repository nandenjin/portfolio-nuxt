
<template>
  <main class="theme--document">
    <h1 class="theme--title">
      Works
    </h1>

    <content-list class="theme-margin-lr" :src="contents" />
  </main>
</template>

<style lang="sass" scoped>

  @import '~/assets/style/themes.sass'

</style>

<script>

  import ContentList from '~/components/ContentList.vue'

  export default {

    components: { ContentList },

    computed: {

      contents() {
        return []
      }

    },

    async asyncData({ getPayload, payload, route }) {
      return { works: payload || await getPayload(route.path) }
    },

    head: {

      title: 'Works | Kazumi Inada / 稲田和巳'

    }

  }

</script>
