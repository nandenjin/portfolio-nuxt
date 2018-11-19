
<template>
  
  <main class="theme--document">
    
    <h1 class="theme--title">Works</h1>

    <content-list class="theme-margin-lr"></content-list>

  </main>

</template>

<style lang="sass" scoped>
  
  @import '~/assets/style/themes.sass'

</style>

<script>

  import ContentList from '~/components/ContentList.vue';
  
  export default {

    components: { ContentList },

    head: {

      title: 'Works | Kazumi Inada / 稲田和巳'

    },

  };

</script>
