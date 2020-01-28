
<template>
  <div class="image-box" :class="{ 'is-loaded': loaded, 'is-player': playerMode, 'is-playing': playing }" @click="playing = playerMode">
    <figure class="hidden-in-playing">
      <picture>
        <source v-if="!isExternalSrc" type="image/webp" :srcset="srcsetWebP">
        <source v-if="!isExternalSrc" type="image/jpeg" :srcset="srcset">
        <img v-if="src" :src="src" :alt="alt" class="src-img" @load="loaded = true">
      </picture>
    </figure>
    <iframe
      v-if="playerMode && playing"
      :src="playerIframeSrc"
      class="player"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
    <div class="player-shadow hidden-in-playing" />
    <img class="play-button hidden-in-playing" src="~/assets/img/player.svg" alt="Play">
  </div>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ImageBox extends Vue {
    @Prop(String) readonly src!: string
    @Prop(String) readonly alt: string | undefined
    @Prop(String) readonly playerSrc: string | undefined
    loaded: boolean = false
    playing: boolean = false

    get srcset (): string {
      if (!this.src) { return '' }
      this.src.match(/^(.+)\.(jpg|png|webp|gif)$/)
      return `${RegExp.$1}_320w.${RegExp.$2} 320w, ${RegExp.$1}_768w.${RegExp.$2} 768w, ${RegExp.$1}_1024w.${RegExp.$2} 1024w, ${RegExp.$1}_1600w.${RegExp.$2} 1600w`
    }

    get srcsetWebP (): string {
      if (!this.src) { return '' }
      this.src.match(/^(.+)\.(jpg|png|webp|gif)$/)
      return `${RegExp.$1}_320w.webp 320w, ${RegExp.$1}_768w.webp 768w, ${RegExp.$1}_1024w.webp 1024w, ${RegExp.$1}_1600w.webp 1600w`
    }

    get isExternalSrc (): boolean {
      return !this.src.match(/^\//)
    }

    get playerMode (): boolean {
      return !!this.playerSrc
    }

    get playerIframeSrc (): string {
      const src = this.playerSrc
      if (src) {
        if (src.match(/https?:\/\/www\.youtube\.com\/watch\?v=([^&]+)/)) {
          return `https://www.youtube.com/embed/${RegExp.$1}?autoplay=1`
        } else if (src.match(/https?:\/\/www\.youtu\.be\/([^&]+)/)) {
          return `https://www.youtube.com/embed/${RegExp.$1}?autoplay=1`
        }
      }

      return ''
    }
  }

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

    .play-button
      display: none

    &.is-loaded
      .src-img
        height: auto
        opacity: 1

      &::before
        display: none

    &.is-player
      cursor: pointer

      .player-shadow
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(0, 0, 0, .5)

      .play-button
        display: inline-block
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        width: 100px
        height: 100px
        margin: auto
        opacity: .5
        transition: opacity .3s ease-out 0s

      .player
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%

      &:hover
        .play-button
          opacity: 1

      &.is-playing
        &::before
          content: ''
          display: inline-block
          padding-top: 9 / 16 * 100%

        .hidden-in-playing
          display: none

</style>
