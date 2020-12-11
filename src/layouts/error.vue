<template>
  <main>
    <h1 v-if="error.statusCode === 404">
      ページが見つかりません
    </h1>
    <h1 v-else>
      エラーが発生しました
    </h1>
  </main>
</template>

<script lang="ts">
import { NuxtError } from '@nuxt/types'
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    error: {
      type: Object as PropType<NuxtError>,
      required: true
    }
  }
})
</script>

<style lang="sass" scoped>
@import '~/assets/style/media.sass'
</style>
