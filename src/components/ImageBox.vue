
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
      width: 100%
      height: 100%
      object-fit: cover

</style>
