
<template>

  <main class="top-container">

    <figure class="eye-catch"></figure>
    <div class="content">
      <div class="centering">
        <h1>
          <img src="~/assets/img/mini-logo.svg" alt="" class="logo">
          <img src="~/assets/img/kazumi_inada.svg" alt="Kazumi Inada" class="kazumi-inada">
        </h1>
        <nav class="nav">
          <nuxt-link class="item" to="/works">Works</nuxt-link>
          <nuxt-link class="item" to="/profile">Profile</nuxt-link>
        </nav>
        <nuxt-link tag="section" class="news" :to="`/news/${ news.slug }`">
          <h3>NEWS</h3>
          <p>{{ news.title.rendered }}</p>
        </nuxt-link>
      </div>
      <nuxt-link tag="section" class="eye-catch-info" to="/works/the_lost_thing">
        <h3>現代人形劇「おとしもの」</h3>
        <p>筑波大学人形劇団NEU, 2018/08</p>
      </nuxt-link>
    </div>

  </main>

</template>

<script>

import axios from 'axios';

  export default {

    async asyncData( { getPayload, env, payload, route } ) {

      return {
        news:　payload || await getPayload( route.path ) || await ( axios.get( `https://${ env.cmsDomain }/${ env.cmsPath }/posts?_embed&per_page=1` ) ).data[0],
      };

    },

    layout: 'plain',

    head: {

      title: 'Kazumi Inada | 稲田和巳'

    },


  }

</script>

<style lang="sass" scoped>

  @import '~/assets/style/media.sass'

  .top-container
    display: flex
    height: 100vh
    flex-direction: column

    +mq(md)
      flex-direction: row

  .eye-catch
    flex: 1 1 100%
    margin: 0
    padding: 0
    background-image: url("~assets/img/eye-catch.jpg")
    background-color: #000
    background-position: center
    background-size: cover

  .content
    position: relative
    flex: 1 1 161%

    .centering
      margin: 50px 40px 30px 40px

      +mq(md)
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto 20%
        height: 500px

      .logo
        display: block
        height: 25px
        margin: 30px 0

        +mq(md)
          height: 40px
          margin: 45px 0

      .kazumi-inada
        display: block
        height: 15px
        margin: 25px 0

        +mq(md)
          height: 20px
          margin: 45px 0

      .nav
        .item
          display: inline-block
          margin: 0 25px 0 0
          color: #000
          font: normal 13px sans-serif
          text-transform: uppercase
          letter-spacing: 0.15em
          transition: color 0.15s ease 0s

          +mq(md)
            font-size: 15px

          &:hover
            color: #aaa
      .news
        display: flex
        margin: 30px 0
        cursor: pointer
        transition: color 0.15s ease 0s

        &:hover
          color: #aaa

        h3
          display: flex
          flex: 0 0 auto
          margin-right: 20px
          font: bold 11px sans-serif
          -webkit-align-items: center
          align-items: center

          +mq(md)
            font-size: 13px

        p
          float: 1 1 auto
          font-size: 11px

          +mq(md)
            font-size: 13px

    .eye-catch-info
      position: absolute
      right: 30px
      bottom: 30px

      h3, p
        margin: 0
        padding: 0
        font-size: 9px
        text-align: right

        +mq(md)
          font-size: 11px

</style>
