const transformers: [RegExp, (string) => string][] = [
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

  for (const [exp, transform] of transformers) {
    html = html.replace(exp, transform)
  }

  return html
}
