/* eslint-disable no-console */
import * as fs from 'fs'
import markdownIt from 'markdown-it'

const md = markdownIt()

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
  const payload = {};

  ['title_ja', 'title_en', 'creator', 'materials', 'year'].forEach((key) => {
    // eslint-disable-next-line no-useless-escape
    if (schemaStr.match(new RegExp(`^${key}\s*:\s*(.+)$`, 'm'))) {
      payload[key] = RegExp.$1
    }
  })

  payload.content = md.render(content)

  return payload
}
