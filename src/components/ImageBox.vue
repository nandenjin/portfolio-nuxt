
<template>
  <figure class="image-box">
    <picture>
      <source type="image/webp" :srcset="srcsetWebP">
      <source type="image/jpeg" :srcset="srcset">
      <img v-if="src" :src="src" :alt="alt">
    </picture>
  </figure>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ImageBox extends Vue {
    @Prop(String) readonly src!: string
    @Prop(String) readonly alt: string | undefined

    get srcset() {
      if (!this.src) return ''
      this.src.match(/^(.+)\.(jpg|png|webp|gif)$/)
      return `${RegExp.$1}_320w.${RegExp.$2} 320w, ${RegExp.$1}_768w.${RegExp.$2} 768w, ${RegExp.$1}_1024w.${RegExp.$2} 1024w, ${RegExp.$1}_1600w.${RegExp.$2} 1600w`
    }

    get srcsetWebP() {
      if (!this.src) return ''
      this.src.match(/^(.+)\.(jpg|png|webp|gif)$/)
      return `${RegExp.$1}_320w.webp 320w, ${RegExp.$1}_768w.webp 768w, ${RegExp.$1}_1024w.webp 1024w, ${RegExp.$1}_1600w.webp 1600w`
    }
  }

</script>

<style lang="sass" scoped>

  .image-box
    position: relative
    overflow: hidden

    background-color: #eee

    img
      position: absolute
      width: 100%
      height: 100%
      object-fit: cover

</style>
