
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

  .layout-container
    display: flex
    flex-direction: column

    +mq(md)
      flex-direction: row

    & > .content
      flex: 1 1 auto

</style>

<script>

  import TheHeader from '~/components/TheHeader'

  export default {
    components: {
      TheHeader
    }
  }

</script>
