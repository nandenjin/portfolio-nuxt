<template>
  <div ref="el" class="youtube-embed">
    <div
      v-if="playing && vid"
      class="player"
      :style="{ height: height + 'px' }"
    >
      <iframe
        class="ytplayer"
        type="text/html"
        :src="`https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`"
        frameborder="0"
      />
    </div>
    <div v-else>
      <image-box :src="poster" />
      <button class="play-button" @click="playing = true">
        Play
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref
} from '@nuxtjs/composition-api'
import ImageBox from '~/components/ImageBox.vue'

export default defineComponent({
  components: {
    ImageBox
  },
  props: {
    src: {
      type: String as PropType<string>,
      required: true
    },
    poster: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup({ src }) {
    const el = ref<HTMLDivElement>()
    const height = ref(0)
    const playing = ref(false)

    let observer: ResizeObserver

    onMounted(() => {
      observer = new ResizeObserver(() => {
        if (!el.value) return
        const { width } = el.value.getBoundingClientRect()
        height.value = (width / 16) * 9
      })

      if (el.value) {
        observer.observe(el.value)
      }
    })

    onBeforeUnmount(() => observer.disconnect())

    return {
      height,
      playing,
      vid: computed(() =>
        src.match(/watch\?v=([a-zA-Z0-9_-]+)/) ? RegExp.$1 : null
      )
    }
  }
})
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
