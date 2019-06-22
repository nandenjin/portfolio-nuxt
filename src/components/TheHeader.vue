<template>
  <header class="header">
    <nuxt-link class="logo-container" to="/" tag="h1">
      <img class="logo" src="~/assets/img/mini-logo.svg" alt="Kazumi Inada Portfolio">
      <img class="kazumi-inada mobile-only" src="~/assets/img/kazumi_inada.svg" alt="">
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
      <span class="material-icons menu-button" @click="opened = true">keyboard_arrow_down</span>
    </div>
    <transition :duration="1200">
      <nav v-if="opened" class="overlay-nav mobile-only" @click="opened = false">
        <div class="overlay__content">
          <div class="overlay__header">
            <span class="close-button">×</span>
          </div>
          <ul class="links">
            <li>
              <n-link to="/works">
                Works
              </n-link>
            </li>
            <li>
              <n-link to="/news">
                News
              </n-link>
            </li>
            <li>
              <n-link to="/profile">
                Profile
              </n-link>
            </li>
          </ul>
          <div class="credit">
            <img class="kazumi-inada" src="~/assets/img/kazumi_inada--white.svg" alt="Kazumi Inada">
            <ul class="social">
              <li>
                <a href="https://twitter.com/nandenjin" target="_blank" rel="noopener" class="fa fa-twitter" />
              </li>
              <li>
                <a href="https://www.facebook.com/nandenjin" target="_blank" rel="noopener" class="fa fa-facebook" />
              </li>
              <li>
                <a href="https://www.instagram.com/nandenjin" target="_blank" rel="noopener" class="fa fa-instagram" />
              </li>
              <li>
                <a href="https://www.linkedin.com/in/nandenjin" target="_blank" rel="noopener" class="fa fa-linkedin" />
              </li>
            </ul>
            <p>Born in 1997 at Osaka, Japan. Belonging University of Tsukuba, College of Media Arts, Science and Technology from 2017. Creating things such as media arts, graphic design works and stage performances with collapsing border between technology and arts.</p>
          </div>
        </div>
      </nav>
    </transition>
  </header>
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class TheHeader extends Vue {
    opened: boolean = true
  }

</script>

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
      margin: 25px 0 15px 0
      cursor: pointer
      transition: opacity 0.3s ease 0s
      overflow-x: hidden
      white-space: nowrap

      +mq(md)
        flex: 0 0 auto

      &:hover
        opacity: 0.5

      .logo
        height: 25px
        margin: 0 20px 0 40px
        vertical-align: middle

        +mq(md)
          margin: 0 35px

      .kazumi-inada
        height: 10px
        vertical-align: middle

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
        margin: 28px 25px
        font-size: 30px
        line-height: 50px
        text-align: center
        user-selectable: none

    .overlay-nav
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100vw
      height: 110vh
      color: #fff
      background: linear-gradient(rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))
      transform: translate3d(0, 0, 0)

      &.v-enter, &.v-leave-to
        transform: translate3d(0, -110vh, 0)
        opacity: 0

        .overlay__content

          .close-button
            opacity: 0
            transform: rotate3d(0, 0, 1, 180deg)

          .links li
            opacity: 0
            transform: translate3d(0, 1em, 0)

          .credit
            opacity: 0

      &.v-enter-active
        transition: transform .2s ease-out 0s, opacity .2s ease-out .1s

        .overlay__content
          $anim-start: .3s

          .close-button
            transition: opacity .2s ease #{$anim-start}, transform .2s ease-out #{$anim-start}

          .links
            @for $i from 1 through 3
              li:nth-child(#{$i})
                transition: opacity .2s ease #{$i * .1s + $anim-start}, transform .2s ease #{$i * .1s + $anim-start}

          .credit
            transition: opacity .2s ease #{$anim-start + .6s}

      &.v-leave-active
        transition: transform .1s ease-out .3s, opacity .3s ease-out 0s

        .overlay__content
          transition: opacity .2s ease 0s

      .overlay__content
        .overlay__header
          text-align: right

          .close-button
            display: inline-block
            width: 40px
            height: 45px
            margin: 28px 25px
            line-height: 45px
            text-align: center
            user-selectable: none
            cursor: pointer

        a
          color: #fff

        .links
          padding: 0
          list-style-type: none
          text-align: center

          li
            margin: 40px 0

            a
              font-family: Helvetica
              font-size: 19px
              letter-spacing: .2em
              text-transform: uppercase

        .credit
          opacity: .4
          margin-top: 80px

          .kazumi-inada
            display: block
            height: 13px
            margin: 30px auto

          .social
            margin: 30px 0
            padding: 0
            text-align: center

            li
              display: inline-block
              margin: 0 15px
              font-size: 20px

          p
            margin: .5em 40px
            font-size: 11px
            line-height: 2em
            text-align: justify

</style>
