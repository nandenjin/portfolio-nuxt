
<template>
  <main class="main theme--document">
    <h1 class="title theme--title">
      {{ title }}
    </h1>

    <div class="theme-text" v-html="content" />
  </main>
</template>

<script>

  export default {
  }

</script>

<style lang="sass">

    @import '~/assets/style/themes.sass'
    @import '~/assets/style/media.sass'

    .main

      .eye-catch
        height: 200px
        margin-top: 15px
        margin-bottom: 15px
        border-radius: 20px

        @include mq(md)
          height: 500px
          margin-top: 85px
          margin-bottom: 85px

</style>
