
<template>
  
  <figure class="image-box">
    <img v-if="src" :src="src" :alt="alt">
  </figure>

</template>

<script>
  
  export default {

    props: [ 'src', 'alt', ],

  };

</script>

<style lang="sass" scoped>
  
  .image-box 
    position: relative
    overflow: hidden

    background-color: #eee

    img
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      width: 100%
      margin: auto
  
</style>
