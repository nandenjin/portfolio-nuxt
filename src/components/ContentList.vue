
<template>
  <div ref="container" class="list-container">
    <article v-for="content in src" :key="content.url" class="item">
      <nuxt-link class="link" :to="content.url">
        <figure>
          <div class="thumbnail">
            <picture>
              <source type="image/webp" :srcset="getSrcSet(content.thumbnail, 'webp')" sizes="(max-width: 800px) 100vw, 30vw">
              <source type="image/jpeg" :srcset="getSrcSet(content.thumbnail, 'jpg')" sizes="(max-width: 800px) 100vw, 30vw">
              <img :src="content.thumbnail" alt="">
            </picture>
          </div>
          <figcaption class="title">
            <h2>{{ content.title_ja }}</h2>
          </figcaption>
        </figure>
      </nuxt-link>
    </article>
  </div>
</template>

<script lang="ts">
  /* eslint camelcase: 0 */

  import { Vue, Component, Prop } from 'vue-property-decorator'

  interface Content {
    title_ja: string
    title_en: string
    thumbnail: string
    tags: string
    url: string
  }

  @Component({
    mounted() {
      const step = () => {
        const container = this.$refs.container as HTMLElement

        if (this.$data.isDestroyed || !container) return
        requestAnimationFrame(step)

        const bounding = container.getBoundingClientRect()
        const w = bounding.width

        const lengthPerRow = Math.ceil(w / 350)
        const scale = w / lengthPerRow / 350

        const isMobile = lengthPerRow === 1

        const width = (isMobile ? 350 : 300) * scale
        const marginR = isMobile ? 0 : (w - width * lengthPerRow) / (lengthPerRow - 1)

        const items = container.getElementsByClassName('item') as HTMLCollectionOf<HTMLElement>
        const thumbs = container.getElementsByClassName('thumbnail') as HTMLCollectionOf<HTMLElement>

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
      this.$data.isDestroyed = true
    }
  })
  export default class ContentList extends Vue {
    @Prop(String) src!: Content[]
    isDestroyed: boolean = false

    getSrcSet(src: string, ext: string): string {
      if (!src) return ''
      src.match(/^(.+)\.(jpg|png|webp|gif)$/)
      return `${RegExp.$1}_320w.${ext} 320w, ${RegExp.$1}_768w.${ext} 768w, ${RegExp.$1}_1024w.${ext} 1024w, ${RegExp.$1}_1600w.${ext} 1600w`
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
        margin: 30px 25px

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
        border-radius: 7px
        background-color: #eee

        img
          position: absolute
          width: 100%
          height: 100%
          object-fit: cover

      .title
        margin-top: 20px

        h2
          width: 100%
          height: 30px
          vertical-align: middle
          font-size: 13px
          overflow-x: hidden
          white-space: nowrap
          text-overflow: ellipsis

</style>
