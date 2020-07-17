<template>
  <main class="theme--document">
    <div class="profile">
      <div>
        <img class="avatar" src="~/assets/img/profile.jpg" alt="" />
      </div>
      <div>
        <h1>Kazumi Inada / 稲田 和巳</h1>
        <div class="title">Designer / Engineer</div>
        <content-renderer :content="content" />
      </div>
    </div>
    <script type="application/ld+json" v-html="jsonLD" />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ContentRenderer from '~/components/ContentRenderer.vue'

const jsonLD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  email: 'hello@nandenjin.com',
  name: 'Kazumi Inada',
  birthPlace: 'Osaka, Japan',
  gender: 'male',
  url: 'https://www.nandenjin.com',
  sameAs: [
    'https://www.facebook.com/nandenjin',
    'https://www.linkedin.com/in/nandenjin',
    'https://twitter.com/nandenjin',
    'https://instagram.com/nandenjin',
    'https://github.com/nandenjin',
  ],
}

@Component({
  async asyncData() {
    const content = await import(`~/../../../tmp/contents/json/pages/profile/index.json`)

    return {
      content: content.default._content
    }
  },
  head: {
    title: 'Profile',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Profile - Kazumi Inada',
      },
    ],
  },
  components: {
    ContentRenderer
  }
})
export default class ProfilePage extends Vue {
  jsonLD: string = JSON.stringify(jsonLD)
}
</script>

<style lang="sass" scoped>

@import '~/assets/style/media.sass'
@import '~/assets/style/themes.sass'

.profile
  font-size: 13px
  margin: 0 30px

  .avatar
    display: block
    width: 200px
    height: 200px
    margin: 30px 0
    border-radius: 15px

    +rmq(md)
      width: 80vw
      height: 80vw
      margin: 100px auto 30px auto

  & /deep/ h1
    margin-top: 80px
    margin-bottom: 20px
    font-size: 1.6em

  .title
    margin: 40px 0
    color: #888
    font-size: 1.05em

  & /deep/ h2
    margin: 50px 0 30px
    font-size: 1.5em

  & /deep/ p
    margin: 15px 0
    line-height: 2em

  & /deep/ ul
      margin: 10px 0
      padding-right: 15px

  & /deep/ li
      margin: 10px 0
      line-height: 1.7em
</style>
