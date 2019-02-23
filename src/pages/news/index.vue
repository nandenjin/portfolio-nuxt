
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

export default {

  async asyncData( { env, payload } ) {

    if( payload ) return { news: payload };
    else return { news: ( await axios.get( `https://${ env.cmsDomain }/${ env.cmsPath }/news?_embed` ) ).data };

  },

};

</script>

<style lang="sass" scoped>

  @import '~/assets/style/themes.sass'

</style>
