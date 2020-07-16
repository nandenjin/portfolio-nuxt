<template>
  <header class="header">
    <nuxt-link to="/" class="logo">
      <img src="~/assets/img/kazumi_inada.svg" alt="Kazumi Inada" />
    </nuxt-link>
    <nav class="menu">
      <ul>
        <nuxt-link tag="li" to="/works">
          Works
        </nuxt-link>
        <nuxt-link tag="li" to="/profile">
          Profile
        </nuxt-link>
        <nuxt-link tag="li" to="/news">
          News
        </nuxt-link>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {
  opened = false
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/media.sass';

.header {
  max-width: 1000px;
  width: calc(100vw - 30px * 2);
  margin: 50px auto 0;

  * {
    vertical-align: middle;
  }

  .logo {
    display: inline-block;
    width: 200px;
    margin: 30px 40px 30px 0;
  }

  .menu {
    display: inline-block;

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    li {
      display: inline-block;
      margin-right: 25px;
      padding: 7px 0px 3px;
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 0.1em;
      border-bottom: 1px solid transparent;
      cursor: pointer;

      &.nuxt-link-active {
        border-bottom: 1px solid #000;
      }
    }
  }
}
</style>
