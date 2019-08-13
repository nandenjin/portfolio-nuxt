/* eslint-disable no-console */
import * as fs from 'fs'
import * as path from 'path'
import markdownIt from 'markdown-it'

const md = markdownIt()
md.use(markdownPlugin)

/**
 * 与えられたrouteのpayloadデータを生成する
 * @param {string} route
 * @param {string} pagesDir
 */
export const getPayload = (route, pagesDir) => {
  // 読み取るファイルのパス
  let filePath = path.join(pagesDir, route) + '.md'

  // indexページ、リストのJSONを返すモードのフラグ
  let indexMode = false

  try {
    fs.statSync(filePath)
  } catch (e) {
    // [route].mdファイルが存在しない場合、[route]/index.mdを探査する
    try {
      const indexPath = path.join(pagesDir, route, 'index.md')
      fs.statSync(indexPath)
      filePath = indexPath
      indexMode = true
    } catch (e) {
      console.error(e)
      return null
    }
  }

  // ファイル内容
  let content = fs.readFileSync(filePath, { encoding: 'utf8' })

  // 通常のページ
  if (!indexMode) {
    const schemaRegExp = /-+\n([\s\S]+?)\n-+\n/
    if (!content.match(schemaRegExp)) {
      return null
    }

    // スキーマ部分をコンテンツから除去
    content = content.replace(schemaRegExp, '')
    const schemaStr = RegExp.$1
    const payload = {}

    // スキーマのkey-valueを取得
    const schemaRows = schemaStr.split('\n')
    for (let i = 0; i < schemaRows.length; i++) {
      // eslint-disable-next-line no-useless-escape
      if (schemaRows[i].match(/^([a-zA-Z0-9_]+)\s*:\s*(.+)$/m)) {
        payload[RegExp.$1] = RegExp.$2
      }
    }

    // コンテンツ部分をmarkdownとしてレンダリング
    payload.content = md.render(content)

    return payload

  // indexページ
  } else {
    const payload = []

    // リンクを含むリストを取得
    const itemStrs = content.match(/^\s*-\s*\[.+\]\(.+\)\s*$/igm)
    if (!itemStrs || itemStrs.length === 0) { return [] }

    for (let i = 0; i < itemStrs.length; i++) {
      itemStrs[i].match(/^\s*-\s*\[.+\]\((.+)\)\s*$/im)

      // リンク先のrouteのpayloadを取得する
      const childRoute = getRouteByFilePath(RegExp.$1)
      const childPayload = getPayload(childRoute, pagesDir)

      // コンテンツ部分を削除
      delete childPayload.content
      delete childPayload.info
      delete childPayload.materials

      // URLを付与
      childPayload.url = childRoute

      payload.push(childPayload)
    }

    return payload
  }
}

/**
 * Markdown-itのレンダリング拡張
 * @param {MarkdownIt} md
 */
function markdownPlugin (md) {
  // <img>
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const aIndex = token.attrIndex('src')
    const src = token.attrs[aIndex][1]
    const alt = self.renderInlineAsText(token.children, options, env)

    // 通常の画像
    if (src.match(/^(\/.+)\.(jpg|png|webp|gif)$/)) {
      return [
        `<figure class="fig">`,
        `<picture>`,
        `<source type="image/webp" srcset="${RegExp.$1}_320w.webp 320w, ${RegExp.$1}_768w.webp 768w, ${RegExp.$1}_1024w.webp 1024w, ${RegExp.$1}_1600w.webp 1600w" sizes="(max-width: 800px) 100vw, 60vw">`,
        `<source type="image/jpg" srcset="${RegExp.$1}_320w.jpg 320w, ${RegExp.$1}_768w.jpg 768w, ${RegExp.$1}_1024w.jpg 1024w, ${RegExp.$1}_1600w.jpg 1600w" sizes="(max-width: 800px) 100vw, 60vw">`,
        `<img src="${RegExp.$1}_1600w.jpg" alt="${alt}">`,
        `</picture>`,
        `</figure>`
      ].join('')

    // YouTube embed
    } else if (src.match(/^https:\/\/www\.youtube\.com\/watch\?v=([^&]+)$/)) {
      return `<figure class="fig" style="position: relative; width: 100%; padding: calc(9 / 16 * 100%) 0 0"><iframe src="https://www.youtube.com/embed/${RegExp.$1}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"></iframe></figure>`

    // 外部画像
    } else {
      return [
        `<figure class="fig">`,
        `<img src="${src}" alt="${alt}">`,
        `</figure>`
      ].join('')
    }
  }

  // <a>
  const defaultRuleLinkOpen = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const hrefIndex = tokens[idx].attrIndex('href')
    const href = tokens[idx].attrs[hrefIndex][1]

    // 外部リンクにtarget="_blank"指定
    if (href.match(/^https?/)) {
      const targetIndex = tokens[idx].attrIndex('target')
      if (targetIndex < 0) { tokens[idx].attrPush(['target', '_blank']) } else { tokens[idx].attrs[targetIndex][1] = '_blank' }

      const relIndex = tokens[idx].attrIndex('rel')
      if (relIndex < 0) { tokens[idx].attrPush(['rel', 'noopener']) } else { tokens[idx].attrs[relIndex][1] = 'noopener' }

    // 内部絶対リンクのパスを修正
    } else if (href.match(/^\//)) {
      tokens[idx].attrs[hrefIndex][1] = getRouteByFilePath(href)
    }

    return defaultRuleLinkOpen(tokens, idx, options, env, self)
  }
}

/**
 * contentリポジトリ内のファイルパスからサイトのrouteに変換
 * @param {string} filePath
 */
function getRouteByFilePath (filePath) {
  return filePath.replace(/^\/pages/, '').replace(/\.md/, '')
}
