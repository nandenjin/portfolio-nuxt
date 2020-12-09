import { join } from 'path'
import { Vue, Component, Prop } from 'vue-property-decorator'
import ImageBox from '~/components/ImageBox.vue'
import YoutubeEmbed from '~/components/YoutubeEmbed.vue'

const contentDistRoot = join('/_nuxt', 'content')

@Component<ContentRenderer>({
  render(h) {
    const { content } = this

    const proc = node => {
      if (node.type === 'text') {
        return node.value
      }

      if (node.tag === 'p') {
        // Replace <p> -> <div> if it contains non-inline children to avoid illegal HTML tree
        const c = (n: typeof node): boolean =>
          (n.tag && !['a', 'nuxt-link', 'strong'].includes(n.tag)) || // <img> will be converted to <image-box> which is block element
          (n.children || []).some(nn => c(nn))
        if (node.children.some(n => c(n))) {
          node.tag = 'div'
        }
      }

      // <img> -> <image-box>
      if (node.tag === 'img') {
        return h(ImageBox, {
          props: {
            ...node.props,
            src: node.props.src
              ? join(contentDistRoot, node.props.src)
              : undefined
          }
        })
      }

      if (node.tag === 'a') {
        // Replace to <youtube-embed> if it is a link to YouTube
        const isYouTubeLink = node.props.href?.startsWith(
          'https://www.youtube.com/watch'
        )
        const containsImageOnly =
          node.children?.length === 1 && node.children?.[0].tag === 'img'
        if (isYouTubeLink && containsImageOnly) {
          const poster = node.children?.[0].props.src
          return h(YoutubeEmbed, {
            props: {
              src: node.props.href,
              poster: poster
                ? poster.match(/^(https?:)\/\//)
                  ? poster
                  : join(contentDistRoot, poster)
                : undefined
            }
          })
        }
      }

      if (node.tag === 'nuxt-link') {
        // Internal links
        node.props.to = node.props.to?.replace(/^\/pages\//, '/')
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

    return h(
      'div',
      {
        class: 'content-renderer'
      },
      content.body.children.map(n => proc(n))
    )
  }
})
export default class ContentRenderer extends Vue {
  @Prop() content
}
