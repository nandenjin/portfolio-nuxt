const transformers: [RegExp, (tag: string) => string][] = [
  [
    /<p>[\s\S]*?<img.*?>[\s\S]*?<\/p>/ig,
    (tag: string) => {
      if (tag.match(/^<p>([\s\S]*?)(<img.*?>)([\s\S]*?)<\/p>$/i)) {
        const a = (RegExp.$1 || '').replace(/<\/?p>|\n/, '')
        const b = RegExp.$2
        const c = (RegExp.$3 || '').replace(/<\/?p>|\n/, '')

        tag = (a.length > 0 ? `<p>${a}</p>` : '') + b + (c.length > 0 ? `<p>${c}</p>` : '')
      }

      return tag
    }
  ],
  [
    /<img.*?>/g,
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
