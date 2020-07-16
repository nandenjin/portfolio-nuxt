import * as path from 'path'
import { Page } from '@nandenjin/md-site-conv'

/**
 * index.mdに列挙されたMarkdownページを配列にして返す
 * @param indexContent index.mdのコンテンツ
 */
export async function getPagesByIndex(indexContent: string): Promise<Page[]> {
  const matchPattern = /<li.*?>.*?<a .*?href=["'](.+?)["'].*?>(.+?)<\/a>.*?<\/li>/gi
  let matchResult
  const dataReqs: Promise<{ default: Page }>[] = []

  while ((matchResult = matchPattern.exec(indexContent)) !== null) {
    const route = matchResult[1]
    const dir = path.dirname(route)
    const id = path.basename(route, '.md')
    const dataReq = import(`~/../../../tmp/contents/json${dir}/${id}.json`)
    dataReqs.push(dataReq)
  }

  const data = await Promise.all(dataReqs)
  const items: Page[] = []
  for (let i = 0; i < data.length; i++) {
    items.push(data[i].default)
  }

  return items
}
