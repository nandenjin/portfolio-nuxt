<template>
  <div ref="container" class="list-container">
    <article v-for="content in src" :key="content.name" class="item">
      <nuxt-link class="link" :to="content.path.replace(/^\/pages/, '')">
        <figure>
          <div
            class="thumbnail"
            :class="{ 'is-loaded': loadedFlag[content.thumbnail] }"
          >
            <picture>
              <source
                type="image/webp"
                :srcset="getSrcSet(content.thumbnail, 'webp')"
                sizes="(max-width: 400px) 100vw, 30vw"
              />
              <source
                type="image/jpeg"
                :srcset="getSrcSet(content.thumbnail, 'jpg')"
                sizes="(max-width: 400px) 100vw, 30vw"
              />
              <img
                :src="getSrc(content.thumbnail)"
                alt=""
                @load="$set(loadedFlag, content.thumbnail, true)"
              />
            </picture>
          </div>
          <figcaption class="caption">
            <h2 class="title">{{ content.title_ja }}</h2>
            <div class="year">{{ content.year }}</div>
          </figcaption>
        </figure>
      </nuxt-link>
    </article>
  </div>
</template>

<script lang="ts">
/* eslint camelcase: 0 */

import { join } from 'path'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { WorkMeta } from '~/types'

interface Content {
  meta: WorkMeta
}

const contentDistRoot = join('/_nuxt', 'content')

@Component({
  mounted() {
    const step = () => {
      const container = this.$refs.container as HTMLElement

      if (this.$data.isDestroyed || !container) {
        return
      }
      requestAnimationFrame(step)

      const bounding = container.getBoundingClientRect()
      const w = bounding.width

      const lengthPerRow = Math.ceil(w / 350)
      const scale = w / lengthPerRow / 350

      const isMobile = lengthPerRow === 1

      const width = (isMobile ? 350 : 300) * scale
      const marginR = isMobile
        ? 0
        : (w - width * lengthPerRow) / (lengthPerRow - 1)

      const items = container.getElementsByClassName(
        'item'
        /* eslint-disable-next-line no-undef */
      ) as HTMLCollectionOf<HTMLElement>
      const thumbs = container.getElementsByClassName(
        'thumbnail'
        /* eslint-disable-next-line no-undef */
      ) as HTMLCollectionOf<HTMLElement>

      for (let i = 0; i < items.length; i++) {
        items[i].style.width = width + 'px'
        items[i].style.marginRight =
          (i % lengthPerRow !== lengthPerRow - 1 ? marginR : 0) + 'px'
        items[i].style.marginLeft = '0px'
      }

      for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].style.width = width + 'px'
        thumbs[i].style.height = width / 1.6 + 'px'
      }
    }
    requestAnimationFrame(step)
  },
  destroyed() {
    this.$data.isDestroyed = true
  }
})
export default class ContentList extends Vue {
  @Prop() src!: Content[]
  isDestroyed = false
  loadedFlag = {}

  getSrc(src: string): string {
    if (!src) {
      return ''
    }
    return join(contentDistRoot, src)
  }

  getSrcSet(src: string, ext: string): string {
    if (!src) {
      return ''
    }
    src.match(/^(.+)\.(jpg|png|webp|gif)$/)
    const base = join(contentDistRoot, RegExp.$1)
    return `${base}_320w.${ext} 320w, ${base}_768w.${ext} 768w, ${base}_1024w.${ext} 1024w, ${base}_1600w.${ext} 1600w`
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
      border: 1px solid rgba(0, 0, 0, .05)

      img
        position: absolute
        width: 100%
        height: 100%
        object-fit: cover
        opacity: 0
        transition: opacity .5s ease 0s

      &.is-loaded
        img
          opacity: 1

    .caption
      margin-top: 20px

      .title
        margin: 5px 0 10px
        width: 100%
        vertical-align: middle
        font-size: 14px
        overflow-x: hidden
        white-space: nowrap
        text-overflow: ellipsis

      .year
        color: #888
        font-size: 13px
</style>
