<template>
  <header class="header">
    <nuxt-link class="logo-container" to="/" tag="h1">
      <img class="logo" src="~/assets/img/mini-logo.svg" alt="Kazumi Inada Portfolio">
    </nuxt-link>
    <nav class="vertical-nav pc-only">
      <nuxt-link class="item" to="/works">
        Works
      </nuxt-link>
      <nuxt-link class="item" to="/news">
        News
      </nuxt-link>
      <nuxt-link class="item" to="/profile">
        Profile
      </nuxt-link>
    </nav>
    <div class="menu-open mobile-only">
      <span class="material-icons menu-button">keyboard_arrow_down</span>
    </div>
  </header>
</template>

<style lang="sass" scoped>

  @import '~/assets/style/media.sass'

  .header
    display: flex
    flex: 0 0 auto
    background-color: #fff
    flex-direction: row

    +mq(md)
      flex-direction: column

    .logo-container
      flex: 1 1 auto
      margin: 35px 0 15px 0
      cursor: pointer
      transition: opacity 0.3s ease 0s

      +mq(md)
        flex: 0 0 auto

      &:hover
        opacity: 0.5

      .logo
        height: 25px
        margin: 0 40px

        +mq(md)
          margin: 0 35px

    .vertical-nav
      flex: 1 1 auto

      & > .item
        display: block
        -ms-writing-mode: vertical-rl
        writing-mode: vertical-rl
        width: 35px
        margin: 20px 25px
        padding: 15px 0
        color: #000
        font-size: 14px
        font-family: Helvetica
        letter-spacing: 0.3em
        text-transform: uppercase
        transition: opacity 0.3s ease 0s
        opacity: .5

        &.nuxt-link-active
          opacity: 1

        &:hover
          opacity: 1

    .menu-open
      flex: 0 0 auto

      .menu-button
        width: 40px
        height: 45px
        margin: 32px 25px
        font-size: 30px
        line-height: 50px
        text-align: center
        user-selectable: none

</style>
