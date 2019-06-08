
<template>
  <div ref="container" class="list-container">
    <article v-for="content in src" :key="content" class="item">
      <nuxt-link class="link" :to="content.url">
        <figure>
          <div class="thumbnail">
            <img :src="content.thumbnail" alt="">
          </div>
          <figcaption class="title">
            <h2>{{ content.title }}</h2>
          </figcaption>
        </figure>
      </nuxt-link>
    </article>
  </div>
</template>

<script>

  export default {

    props: [ 'src' ],

    mounted() {
      const step = () => {
        const container = this.$refs.container

        if (this._isDestroyed || !container) return
        requestAnimationFrame(step)

        const bounding = container.getBoundingClientRect()
        const w = bounding.width

        const lengthPerRow = Math.ceil(w / 350)
        const scale = w / lengthPerRow / 350

        const isMobile = lengthPerRow === 1

        const width = (isMobile ? 350 : 300) * scale
        const marginR = isMobile ? 0 : (w - width * lengthPerRow) / (lengthPerRow - 1)

        const items = container.getElementsByClassName('item')
        const thumbs = container.getElementsByClassName('thumbnail')

        for (let i = 0; i < items.length; i++) {
          items[ i ].style.width = width + 'px'
          items[ i ].style.marginRight = (i % lengthPerRow !== lengthPerRow - 1 ? marginR : 0) + 'px'
          items[ i ].style.marginLeft = '0px'
        }

        for (let i = 0; i < thumbs.length; i++) {
          thumbs[ i ].style.width = width + 'px'
          thumbs[ i ].style.height = width / 1.6 + 'px'
        }
      }

      requestAnimationFrame(step)
    },

    destroyed() {

    }

  }

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
          width: 100%
          height: 100%
          object-fit: cover

      .title
        margin-top: 20px

        h2
          display: table-cell
          height: 30px
          vertical-align: middle
          font-size: 14px
          overflow-x: hidden

</style>
