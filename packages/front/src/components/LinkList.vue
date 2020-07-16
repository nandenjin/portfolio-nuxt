
<template>
  <ul class="link-list">
    <nuxt-link v-for="item in items" :key="item.title" :to="item.to" tag="li" class="item">
      {{ item.title }}
    </nuxt-link>
  </ul>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class LinkList extends Vue {
    @Prop(Array) items!: Object[]
  }

</script>

<style lang="sass" scoped>

  .link-list
    padding: 0
    list-style: none

    .item
      padding: 20px 0
      font-size: 13px
      line-height: 2em
      border: 1px solid #eee
      border-style: solid none
      cursor: pointer

      &+.item
        border-top: none

</style>
