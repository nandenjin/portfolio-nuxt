<template>
  <div
    class="image-box"
    :class="{
      'is-loaded': loaded,
      'is-player': playerMode,
      'is-playing': playing,
      'is-cover': cover
    }"
    @click="playing = playerMode"
  >
    <figure class="fig">
      <picture>
        <source
          v-if="!isExternalSrc"
          type="image/webp"
          :srcset="srcsetWebP"
          :sizes="sizes"
        />
        <source
          v-if="!isExternalSrc"
          type="image/jpeg"
          :srcset="srcset"
          :sizes="sizes"
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
    <iframe
      v-if="playerMode && playing"
      :src="playerIframeSrc"
      class="player"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
    <div class="player-shadow hidden-in-playing" />
    <img
      class="play-button hidden-in-playing"
      src="~/assets/img/player.svg"
      alt="Play"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

const SIZES = [320, 768, 1024, 1600]

@Component
export default class ImageBox extends Vue {
  @Prop(String) readonly src!: string
  @Prop(String) readonly alt: string | undefined
  @Prop(String) readonly playerSrc: string | undefined
  @Prop({ default: '100vw' }) readonly sizes!: string
  @Prop({ default: false }) readonly cover!: boolean
  loaded = false
  playing = false

  get srcset(): string {
    if (!this.src) {
      return ''
    }
    this.src.match(/^(.+)\.(jpg|png|webp|gif)$/)
    return SIZES.map(
      size => `${RegExp.$1}_${size}w.${RegExp.$2} ${size}w`
    ).join(',')
  }

  get srcsetWebP(): string {
    if (!this.src) {
      return ''
    }
    this.src.match(/^(.+)\.(jpg|png|webp|gif)$/)
    return SIZES.map(size => `${RegExp.$1}_${size}w.webp ${size}w`).join(',')
  }

  get isExternalSrc(): boolean {
    return !this.src.match(/^\//)
  }

  get playerMode(): boolean {
    return !!this.playerSrc
  }

  get playerIframeSrc(): string {
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

  &.is-loaded
    &::before
      display: none

  .fig
    width: 100%
    height: 100%

  .src-img
    width: 100%
    height: 0.1px
    object-fit: cover
    opacity: 0
    transition: opacity 1s ease 0s

  &.is-loaded .src-img
      height: auto
      opacity: 1

  &.is-loaded.is-cover .src-img
      height: 100%

  .play-button
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
