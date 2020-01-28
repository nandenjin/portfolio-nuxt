const transformers: [RegExp, (tag: string, ...p: string[]) => string][] = [
  [
    // YouTubeの埋め込み処理 <image-box>
    /<a(.*)><img(.*)><\/a>/ig,
    (_, a, b) => {
      let href: string = ''
      let src: string = ''
      let alt: string = ''
      if (/href=['"](.+?)['"]/.test(a)) {
        href = RegExp.$1
      }
      if (/src=['"](.+?)['"]/.test(b)) {
        src = RegExp.$1
      }

      if (/alt=['"](.+?)['"]/.test(b)) {
        alt = RegExp.$1
      }
      return `<image-box src="${src}" alt="${alt}" playerSrc="${href}" />`
    }
  ],

  // <img>を<image-box>に
  [
    /<img.*?>/ig,
    (tag: string) => {
      let src: string = ''
      let alt: string = ''
      if (/src=['"](.+?)['"]/.test(tag)) {
        src = RegExp.$1
      }

      if (/alt=['"](.+?)['"]/.test(tag)) {
        alt = RegExp.$1
      }

      return `<image-box src="${src}" alt="${alt}" />`
    }
  ],

  // <p>のなかに<image-box>が入るのを防ぐ
  [
    /<p>([\s\S]*?)(<image-box.*?>)([\s\S]*?)<\/p>/ig,
    (tag: string, a: string, b: string, c: string) => {
      a = a.replace(/<\/?p>|\n/, '')
      c = c.replace(/<\/?p>|\n/, '')

      tag = (a.length > 0 ? `<p>${a}</p>` : '') + b + (c.length > 0 ? `<p>${c}</p>` : '')

      return tag
    }
  ]
]

/**
 * プレーンなHTML文字列を表示用に加工する
 * @param html
 */
export function transformHTML (html: string): string {
  if (!html) {
    throw new Error('Invalid input HTML')
  }

  let prev: string
  for (const [exp, transform] of transformers) {
    do {
      prev = html
      html = html.replace(exp, transform)
    } while (prev !== html)
  }

  return html
}
