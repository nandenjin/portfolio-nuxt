
<template>

  <main class="theme--document">

    <h1 class="theme--title">News</h1>

    <ul v-for="item in news">
      <nuxt-link :to="`/news/${ item.slug }`" tag="li">{{ item.title.rendered }}</nuxt-link>
    </ul>

  </main>

</template>

<script>

import axios from 'axios';

import LinkList from '~/components/LinkList.vue';

export default {

  components: { LinkList },

  async asyncData( { getPayload, env, payload, route } ) {

    return { news: payload || await getPayload( route.path ) || ( await axios.get( `https://${ env.cmsDomain }/${ env.cmsPath }/posts?_embed` ) ).data };

  },

  computed: {

    items() {

      return this.news.map( item => ( {
        title: item.title.rendered,
        to: `/news/${ item.slug }`
      } ) );

    },

  },

};

</script>

<style lang="sass" scoped>

  @import '~/assets/style/themes.sass'

</style>
