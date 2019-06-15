/* eslint-disable no-console */
import * as fs from 'fs'
import markdownIt from 'markdown-it'

const md = markdownIt()
md.use(markdownPlugin)

export const getPayload = (filePath) => {
  try {
    fs.statSync(filePath)
  } catch (e) {
    return null
  }

  let content = fs.readFileSync(filePath, { encoding: 'utf8' })

  const schemaRegExp = /-+\n([\s\S]+?)\n-+\n/
  if (!content.match(schemaRegExp)) {
    return null
  }

  content = content.replace(schemaRegExp, '')
  const schemaStr = RegExp.$1
  const payload = {}

  const schemaRows = schemaStr.split('\n')
  for (let i = 0; i < schemaRows.length; i++) {
    // eslint-disable-next-line no-useless-escape
    if (schemaRows[i].match(/^([a-zA-Z0-9_]+)\s*:\s*(.+)$/m)) {
      payload[RegExp.$1] = RegExp.$2
    }
  }

  payload.content = md.render(content)

  return payload
}

function markdownPlugin(md) {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const aIndex = token.attrIndex('src')
    const src = token.attrs[aIndex][1]
    const alt = self.renderInlineAsText(token.children, options, env)

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
    } else if (src.match(/^https:\/\/www\.youtube\.com\/watch?v=([^&]+)$/)) {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${RegExp.$1}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    } else {
      return [
        `<figure class="fig">`,
        `<img src="${src}" alt="${alt}">`,
        `</figure>`
      ].join('')
    }
  }
}
