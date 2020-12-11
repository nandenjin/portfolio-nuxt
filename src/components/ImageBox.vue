<template>
  <div
    class="image-box"
    :class="{
      'is-loaded': loaded
    }"
  >
    <figure>
      <picture>
        <source
          v-if="!isExternalSrc"
          type="image/webp"
          :srcset="srcset('webp')"
        />
        <source
          v-if="!isExternalSrc"
          type="image/jpeg"
          :srcset="srcset('jpg')"
        />
        <img
          v-if="src"
          :src="src"
          :alt="alt"
          class="src-img"
          @load="loaded = true"
        />
      </picture>
    </figure>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref
} from '@nuxtjs/composition-api'
const SIZES = [320, 768, 1024, 1600]

export default defineComponent({
  props: {
    src: {
      type: String as PropType<string>,
      required: true
    },
    alt: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup({ src }) {
    return {
      loaded: ref(false),
      playing: ref(false),
      srcset: (ext: string) => {
        src.match(/^(.+)\.(jpg|png|webp|gif)$/)
        return SIZES.map(size => `${RegExp.$1}_${size}w.${ext} ${size}w`).join(
          ','
        )
      },
      isExternalSrc: computed(() => !src.match(/^\//))
    }
  }
})
</script>

<style lang="sass" scoped>

.image-box
  position: relative
  background-color: #eee
  border: 0.1px solid transparent

  // <picture>のぶん画像下に謎の空白が開く対処
  line-height: 0

  &::before
    content: ''
    display: inline-block
    padding-top: 9 / 16 * 100%

  .src-img
    width: 100%
    height: 0.1px
    object-fit: cover
    opacity: 0
    transition: opacity 1s ease 0s


  &.is-loaded
    .src-img
      height: auto
      opacity: 1

    &::before
      display: none
</style>
