<template>
  <div class="youtube-embed">
    <div v-if="playing && vid" class="player" :style="{ height: height + 'px' }">
      <iframe
        class="ytplayer"
        type="text/html"
        :src="`https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`"
        frameborder="0"
      />
    </div>
    <div v-else>
      <image-box :src="src" />
      <button class="play-button" @click="playing = true">
        Play
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import ImageBox from '~/components/ImageBox.vue'

  // https://github.com/Microsoft/TypeScript/issues/28502#issuecomment-711070591
  import 'resize-observer-browser'

@Component<YoutubeEmbed>({
  components: {
    ImageBox
  }
})
  export default class YoutubeEmbed extends Vue {
  @Prop(String) src!: string
  @Prop(String) poster!: string
  height = 0
  playing = false

  private observer?: ResizeObserver

  mounted () {
    const observer = new ResizeObserver(() => {
      const { width } = this.$el.getBoundingClientRect()
      this.height = width / 16 * 9
    })
    observer.observe(this.$el)
    this.observer = observer
  }

  beforeDestroy () {
    this.observer?.disconnect()
  }

  get vid () {
    if (this.src.match(/watch\?v=([a-zA-Z0-9_-]+)/)) {
      return RegExp.$1
    } else {
      return null
    }
  }
  }
</script>

<style lang="sass" scoped>
.youtube-embed
  position: relative

  .player
    .ytplayer
      width: 100%
      height: 100%

  .play-button
    display: inline-block
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 70px
    height: 70px
    margin: auto
    background: url('~assets/img/player.svg')
    text-indent: -1000em
    border: none
    border-radius: 50%
</style>
