
<template>

  <main class="main theme--document">

    <h1 class="title theme--title">{{ title }}</h1>

    <image-box class="eye-catch" :src="thumbnail" alt=""></image-box>

    <div class="text">
      <slot />
    </div>

  </main>

</template>

<script>

  import ImageBox from '~/components/ImageBox.vue';

  export default {

    props: [ 'title', 'thumbnail', ],

    components: { ImageBox },

    head() {

      return {

        title: this.title,

      };

    },

  };

</script>
