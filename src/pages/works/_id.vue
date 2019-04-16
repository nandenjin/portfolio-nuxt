
<template>

  <main class="main theme--document">

    <h1 class="title theme--title">{{ title }}</h1>

    <image-box class="eye-catch theme-margin-lr" :src="thumbnail" alt=""></image-box>

    <div class="theme-text" v-html="content"></div>

  </main>

</template>

<script>

  import axios from 'axios';
  import ImageBox from '~/components/ImageBox.vue';

  export default {

    async asyncData( { getPayload, params, env, payload, route } ) {

      payload = payload || await getPayload( route.path ) || ( await ( axios.get( `https://${ env.cmsDomain }/${ env.cmsPath }/works?_embed&slug=${ params.id }` ) ) ).data[ 0 ];

      return {
        title: payload.title.rendered,
        thumbnail: ( payload._embedded && payload._embedded[ 'wp:featuredmedia' ] && payload._embedded[ 'wp:featuredmedia' ][0] ) ? payload._embedded[ 'wp:featuredmedia' ][0].media_details.sizes.medium_large.source_url : '',
        content: payload.content.rendered,
      };

    },

    components: {

      ImageBox,

    },

  };

</script>

<style lang="sass">

  @import '~/assets/style/themes.sass'
  @import '~/assets/style/media.sass'

  .main

    .eye-catch
      height: 200px
      margin-top: 15px
      margin-bottom: 15px
      border-radius: 20px

      @include mq(md)
        height: 500px
        margin-top: 85px
        margin-bottom: 85px

</style>
