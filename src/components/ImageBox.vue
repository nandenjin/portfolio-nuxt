
<template>
  <figure class="image-box" :class="{ 'is-loaded': loaded }">
    <picture>
      <source type="image/webp" :srcset="srcsetWebP">
      <source type="image/jpeg" :srcset="srcset">
      <img v-if="src" :src="src" :alt="alt" @load="loaded = true">
    </picture>
  </figure>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ImageBox extends Vue {
    @Prop(String) readonly src!: string
    @Prop(String) readonly alt: string | undefined
    loaded: boolean = false

    get srcset () {
      if (!this.src) { return '' }
      this.src.match(/^(.+)\.(jpg|png|webp|gif)$/)
      return `${RegExp.$1}_320w.${RegExp.$2} 320w, ${RegExp.$1}_768w.${RegExp.$2} 768w, ${RegExp.$1}_1024w.${RegExp.$2} 1024w, ${RegExp.$1}_1600w.${RegExp.$2} 1600w`
    }

    get srcsetWebP () {
      if (!this.src) { return '' }
      this.src.match(/^(.+)\.(jpg|png|webp|gif)$/)
      return `${RegExp.$1}_320w.webp 320w, ${RegExp.$1}_768w.webp 768w, ${RegExp.$1}_1024w.webp 1024w, ${RegExp.$1}_1600w.webp 1600w`
    }
  }

</script>

<style lang="sass" scoped>

  .image-box
    background-color: #eee
    border: 0.1px solid transparent

    // <picture>のぶん画像下に謎の空白が開く対処
    line-height: 0

    &::before
      content: ''
      display: inline-block
      padding-top: 9 / 16 * 100%

    img
      width: 100%
      height: 0.1px
      object-fit: cover
      opacity: 0
      transition: opacity 1s ease 0s

    &.is-loaded
      img
        height: auto
        opacity: 1

      &::before
        display: none

</style>
