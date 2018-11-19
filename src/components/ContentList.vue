
<template>

  <div class="list-container" ref="container">
    
    <article class="item" v-for="content in contents">
      <nuxt-link class="link" :to="content.url">
        <figure>
          <div class="thumbnail">
            <img :src="content.thumbnail" alt="">
          </div>
          <figcaption class="title">
            <h2>{{ content.title_ja }}</h2>
          </figcaption>
        </figure>
      </nuxt-link>
    </article>

  </div>
  
</template>

<script>

  import sampleImg from '~/assets/img/eye-catch.jpg';
  
  export default {

    props: [ 'src' ],

    data() {

      return {

        contents: [
          { id: 'xxx', thumbnail: sampleImg, url: '/works/xxx', title_ja: '現代人形劇「おとしもの」' },
          { id: 'xxx', thumbnail: sampleImg, url: '/works/xxx', title_ja: '現代人形劇「おとしもの」' },
          { id: 'xxx', thumbnail: sampleImg, url: '/works/xxx', title_ja: '現代人形劇「おとしもの」' },
          { id: 'xxx', thumbnail: sampleImg, url: '/works/xxx', title_ja: '現代人形劇「おとしもの」' },
          { id: 'xxx', thumbnail: sampleImg, url: '/works/xxx', title_ja: '現代人形劇「おとしもの」' },
          { id: 'xxx', thumbnail: sampleImg, url: '/works/xxx', title_ja: '現代人形劇「おとしもの」' },
        ],

      };

    },

    mounted() {

      const step = () => {

        const container = this.$refs.container;

        if( this._isDestroyed || !container ) return;
        requestAnimationFrame( step );

        const bounding = container.getBoundingClientRect();
        const w = bounding.width;

        const lengthPerRow = Math.ceil( w / 350 );
        const scale = w / lengthPerRow / 350;

        const isMobile = lengthPerRow === 1;

        const width = ( isMobile ? 350 : 300 ) * scale;
        const marginLR = isMobile ? 0 : ( w - width * lengthPerRow ) / lengthPerRow / 2;

        const items = container.getElementsByClassName( 'item' );
        const thumbs = container.getElementsByClassName( 'thumbnail' );

        for( let i = 0; i < items.length; i++ ) {

          items[ i ].style.width  = width + 'px';
          items[ i ].style.marginLeft  = marginLR + 'px';
          items[ i ].style.marginRight = marginLR + 'px';

        }

        for( let i = 0; i < thumbs.length; i++ ) {

          thumbs[ i ].style.width  = width + 'px';
          thumbs[ i ].style.height = width / 1.6 + 'px';

        }

      };

      requestAnimationFrame( step );

    }, 

    destroyed() {



    },

  };

</script>

<style lang="sass" scoped>

  @import '~/assets/style/media.sass'

  .list-container

    & > .item
      display: inline-block
      transition: transform 0.3s ease 0s
      margin: 15px
      
      +mq(md)
        margin: 25px

      &:hover
        transform: scale3d(1.05, 1.05, 1)

      & > .link
        display: block
        color: #000

      .thumbnail
        position: relative
        width: 300px
        height: (300px / 1.67)
        overflow: hidden
        border-radius: 15px

        img
          position: absolute
          top: 0
          left: 0
          right: 0
          bottom: 0
          width: 100%
          margin: auto

      .title
        margin-top: 20px

        h2
          display: table-cell
          height: 30px
          vertical-align: middle
          font-size: 14px
          overflow-x: hidden

</style>
