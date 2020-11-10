<template>
  <div class="layout-container">
    <the-header />
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '~/assets/style/media.sass'
</style>

<script>
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    TheHeader,
  },
}
</script>
