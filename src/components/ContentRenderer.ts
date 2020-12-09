import { join } from 'path'
import { Vue, Component, Prop } from 'vue-property-decorator'
// import * as compiler from 'vue-template-compiler'
// @ts-ignore
import ImageBox from '~/components/ImageBox'
import YoutubeEmbed from '~/components/YoutubeEmbed.vue'

const contentDistRoot = join('/_nuxt', 'content')

@Component<ContentRenderer>({
  render (h) {
    const { content } = this

    const proc = (node) => {
      if (node.type === 'text') { return node.value }

      // <img>はImageBoxコンポーネントを使用
      if (node.tag === 'img') { return h(ImageBox, { props: { ...node.props, src: node.props.src ? join(contentDistRoot, node.props.src) : undefined } }) }

      if (node.tag === 'a') {
        // YouTubeへのリンクサムネイルであればプレーヤに置き換える
        const isYouTubeLink = node.props.href?.startsWith('https://www.youtube.com/watch')
        const containsImageOnly = node.children?.length === 1 && node.children?.[0].tag === 'img'
        if (isYouTubeLink && containsImageOnly) {
          const poster = node.children?.[0].props.src
          return h(YoutubeEmbed, { props: { src: node.props.href, poster: poster ? join(contentDistRoot, poster) : undefined } })
        }
      }

      if (node.tag === 'nuxt-link') {
        // 内部絶対リンクで/pagesは除去する
        node.props.to = node.props.to?.replace(/^\/pages\//, '/')

        // .mdも除去する
        node.props.to = node.props.to?.replace(/\.md$/, '')
      }

      const data = { attrs: {} }
      const rootKeys = ['class', 'style']
      for (const key in node.props) {
        const value = node.props[key]
        if (rootKeys.includes(key)) {
          data[key] = value
        } else {
          data.attrs[key] = value
        }
      }

      const children = (node.children || []).map(n => proc(n))
      return h(node.tag, data, children)
    }

    return h('div', {}, content.body.children.map(n => proc(n)))
  }
})
export default class ContentRenderer extends Vue {
  @Prop() content!: any
}
