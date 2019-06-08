
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

  import axios from 'axios'

  import ContentList from '~/components/ContentList.vue'

  export default {

    components: { ContentList },

    computed: {

      contents() {
        return this.works.map(w => ({
          url: `/${w.type}/${w.slug}`,
          title: w.title.rendered,
          thumbnail: (w._embedded && w._embedded[ 'wp:featuredmedia' ] && w._embedded[ 'wp:featuredmedia' ][0]) ? w._embedded[ 'wp:featuredmedia' ][0].media_details.sizes.medium_large.source_url : ''
        }))
      }

    },

    async asyncData({ getPayload, env, payload, route }) {
      return { works: payload || await getPayload(route.path) || (await axios.get(`https://${env.cmsDomain}/${env.cmsPath}/works?_embed`)).data }
    },

    head: {

      title: 'Works | Kazumi Inada / 稲田和巳'

    }

  }

</script>
