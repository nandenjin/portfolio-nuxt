
<template>
  <main class="theme--document">
    <h1 class="theme--title">
      News
    </h1>

    <link-list :items="items" class="theme-margin-lr" />
  </main>
</template>

<script>

  import LinkList from '~/components/LinkList.vue'

  export default {

    components: { LinkList },

    computed: {

      items() {
        return []
      }

    },

    async asyncData({ getPayload, env, payload, route }) {

    }

  }

</script>

<style lang="sass" scoped>

  @import '~/assets/style/themes.sass'

</style>
