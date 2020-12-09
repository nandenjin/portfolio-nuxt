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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { NuxtError } from '@nuxt/types'

@Component
export default class ErrorPage extends Vue {
  @Prop({ type: Object, required: true }) error!: NuxtError
}
</script>

<style lang="sass" scoped>
@import '~/assets/style/media.sass'
</style>
