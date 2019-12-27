
<template>
  <main class="top-container">
    <figure class="eye-catch" />
    <div class="content">
      <div class="centering">
        <h1>
          <img src="~/assets/img/mini-logo.svg" alt="" class="logo">
          <img src="~/assets/img/kazumi_inada.svg" alt="Kazumi Inada" class="kazumi-inada">
        </h1>
        <nav class="nav">
          <nuxt-link class="item" to="/works">
            Works
          </nuxt-link>
          <nuxt-link class="item" to="/profile">
            Profile
          </nuxt-link>
        </nav>
        <nuxt-link tag="section" class="news" :to="`/news`">
          <h3>NEWS</h3>
          <p class="news--text">
            <span class="news--ja">{{ latestNews ? latestNews.meta.title_ja : '' }}</span>
            <span class="news--en">{{ latestNews ? latestNews.meta.title_en : '' }}</span>
          </p>
        </nuxt-link>
      </div>
      <nuxt-link tag="section" class="eye-catch-info" to="/works/residents">
        <h3>「住人たち」/ "Residents"</h3>
        <p>Kazumi Inada, 2019/05-06</p>
      </nuxt-link>
    </div>
  </main>
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'
  import { getPagesByIndex } from '../lib'

  @Component({
    async asyncData () {
      const data = await import('~/../tmp/contents/json/pages/news/index.json')
      return {
        news: await getPagesByIndex(data.default._content)
      }
    },
    layout: 'plain',
    head: {
      title: 'Kazumi Inada | 稲田和巳',
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' }
      ]
    }
  })
  export default class IndexPage extends Vue {
    news?
    get latestNews () {
      return this.news && this.news.length > 0 ? this.news[0] : null
    }
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
    background-image: url("/assets/works/residents/residents_zoom-0_1600w.jpg")
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
          position: relative
          float: 1 1 auto
          font-size: 11px

          +mq(md)
            font-size: 13px

          .news--ja, .news--en
            display: block
            width: 100%

          .news--ja
            transform: translateY(50%)
            animation: news-sw 8s linear 0s infinite

          .news--en
            opacity: 0
            transform: translateY(-50%)
            animation: news-sw 8s linear 4s infinite

          @keyframes news-sw
            0%
              opacity: 0
            5%
              opacity: 1
            40%
              opacity: 1
            45%
              opacity: 0
            100%
              opacity: 0

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
