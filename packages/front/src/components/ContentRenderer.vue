<template>
  <v-runtime-template :template="contentTemplate" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import VRuntimeTemplate from 'v-runtime-template'
import { transformHTML } from '@nandenjin/portfolio-nuxt-contents-module/util/index'
import ImageBox from '~/components/ImageBox.vue'

@Component({
  components: {
    VRuntimeTemplate,
    ImageBox,
  },
})
export default class ContentRenderer extends Vue {
  @Prop(String) content!: string

  get contentTemplate(): string {
    return transformHTML(`<div>${this.content}</div>`)
  }
}
</script>
