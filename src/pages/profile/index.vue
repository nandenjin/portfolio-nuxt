<template>
  <main class="main doc">
    <div class="profile">
      <div>
        <img class="avatar" src="~/assets/img/profile.jpg" alt="" />
      </div>
      <div>
        <h1>Kazumi Inada / 稲田 和巳</h1>
        <div class="title">
          Designer / Engineer
        </div>
        <content-renderer v-if="page" :content="page" />
      </div>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <script type="application/ld+json" v-html="jsonLD" />
  </main>
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import {
  defineComponent,
  reactive,
  useContext,
  useFetch
} from '@nuxtjs/composition-api'
import ContentRenderer from '~/components/ContentRenderer'
import { NuxtRootContext } from '~/types'

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
    'https://instagram.com/nandenjin'
  ]
}

export default defineComponent({
  name: 'ProfilePage',
  components: {
    ContentRenderer
  },
  setup() {
    const { $content } = useContext() as NuxtRootContext
    const state = reactive<{ page: IContentDocument | null; jsonLD: string }>({
      page: null,
      jsonLD: JSON.stringify(jsonLD)
    })
    const { fetch } = useFetch(async () => {
      state.page = (await $content(
        'pages/profile/index'
      ).fetch()) as IContentDocument
    })

    fetch()

    return state
  },
  head: {
    title: 'Profile',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Profile - Kazumi Inada'
      }
    ]
  }
})
</script>

<style lang="sass" scoped>

@import '~/assets/style/media.sass'

.profile
  font-size: 13px
  margin: 100px 30px 0

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

  & ::v-deep
    .title
      margin: 40px 0
      color: #888
      font-size: 1.05em

    h1
      margin-top: 80px
      margin-bottom: 20px
      font-size: 1.6em

    h2
      margin: 50px 0 30px
      font-size: 1.5em

    p
      margin: 15px 0
      line-height: 2em

    ul
      margin: 10px 0
      padding-right: 15px

    li
      margin: 10px 0
      line-height: 1.7em
</style>
