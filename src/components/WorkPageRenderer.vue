
<template>
  <main class="main theme--document">
    <h1 class="title theme--title">
      {{ title }}
    </h1>

    <image-box class="eye-catch" :src="thumbnail" alt="" />

    <div class="text">
      <slot />
    </div>
  </main>
</template>

<script>

  import ImageBox from '~/components/ImageBox.vue'

  export default {

    components: { ImageBox },

    props: [ 'title', 'thumbnail' ],

    head() {
      return {

        title: this.title

      }
    }

  }

</script>
