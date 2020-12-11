<template>
  <div class="layout-container">
    <the-header />
    <div class="content">
      <nuxt />
    </div>
    <the-footer />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import TheFooter from '~/components/TheFooter.vue'
import TheHeader from '~/components/TheHeader'

export default defineComponent({
  components: {
    TheHeader,
    TheFooter
  }
})
</script>

TheFooter
<style lang="sass" scoped>
@import '~/assets/style/media.sass'
</style>
