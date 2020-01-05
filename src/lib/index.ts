import * as path from 'path'

export async function getPagesByIndex (indexContent: string) {
  const matchPattern = /<li.*?>.*?<a .*?href=["'](.+?)["'].*?>(.+?)<\/a>.*?<\/li>/ig
  let matchResult
  const dataReqs: Promise<any>[] = []

  while ((matchResult = matchPattern.exec(indexContent)) !== null) {
    const route = matchResult[1]
    const dir = path.dirname(route)
    const id = path.basename(route, '.md')
    const dataReq = import(`~/../tmp/contents/json${dir}/${id}.json`)
    dataReqs.push(dataReq)
  }

  const data = await Promise.all(dataReqs)
  const items: any = []
  for (let i = 0; i < data.length; i++) {
    items.push(data[i].default)
  }

  return items
}
