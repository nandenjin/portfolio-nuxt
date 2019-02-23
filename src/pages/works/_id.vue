
<template>

  <main class="main theme--document">

    <h1 class="title theme--title">{{ title }}</h1>

    <image-box class="eye-catch" :src="thumbnail" alt=""></image-box>

    <div class="text" v-html="content"></div>

  </main>

</template>

<script>

  import axios from 'axios';
  import ImageBox from '~/components/ImageBox.vue';

  export default {

    async asyncData( { params, env, payload } ) {

      if( !payload ) {
        payload = ( await ( axios.get( `https://${ env.cmsDomain }/${ env.cmsPath }/works?_embed&slug=${ params.id }` ) ) ).data[ 0 ];
      }

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

  @import '~/assets/style/media.sass'

  .main
    margin: 20px 0

    @include mq(md)
      margin: 20px 100px

    .title
      margin-top: 70px
      margin-bottom: 70px

    .eye-catch
      height: 200px
      margin: 15px 25px
      border-radius: 20px

      @include mq(md)
        height: 500px
        margin: 85px 45px

    .text
      margin: 50px 0

      p
        width: calc( 100% - 60px )
        margin: 10px auto
        font-size: 13px

        @include mq(md)
          max-width: 900px
          margin: 10px auto

</style>
