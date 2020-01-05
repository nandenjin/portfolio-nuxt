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

      function srcSize (size: string, ext?: string) {
        return src.replace(/\.([a-zA-Z0-9]+)$/, `_${size}.` + (ext || RegExp.$1))
      }

      return `<figure class="fig">
        <picture>
          <source type="image/webp" srcset="${srcSize('320w', 'webp')} 320w, ${srcSize('768w', 'webp')} 768w, ${srcSize('1024w', 'webp')} 1024w, ${srcSize('1600w', 'webp')} 1600w" sizes="(max-width: 800px) 100vw, 60vw"><source type="image/jpg" srcset="${srcSize('320w', 'jpg')} 320w, ${srcSize('768w', 'jpg')} 768w, ${srcSize('1024w', 'jpg')} 1024w,  ${srcSize('1600w', 'jpg')} 1600w" sizes="(max-width: 800px) 100vw, 60vw"><img src="${srcSize('1600w', 'jpg')}" alt="${alt}"></picture></figure>`
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
