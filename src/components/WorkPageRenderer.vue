
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

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  import ImageBox from '~/components/ImageBox.vue'

  @Component({
    components: {
      ImageBox
    },
    head () {
      return {

        title: this.title

      }
    }
  })
  export default class WorkPageRenderer extends Vue {
    @Prop(String) title!: string
    @Prop(String) thumbnail!: string
  }

</script>
