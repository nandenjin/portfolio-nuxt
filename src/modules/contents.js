/* eslint no-console: 0 */

const fs = require('fs')
const path = require('path')

const cpx = require('cpx')
const md = require('markdown-it')()

const tmpDir = path.join(__dirname, '../../tmp')
const workDir = path.join(tmpDir, 'contents')

export default function Contents() {
  const assetRoutes = []

  this.nuxt.hook('generate:extendRoutes', (routes) => {
    // 各カテゴリごとのスキャン
    ['works'].forEach((dir) => {
      const categoryPath = path.join(workDir, dir)

      // 各記事ごとのスキャン
      fs.readdirSync(categoryPath).forEach((file) => {
        const route = path.join(dir, file)
        const filePath = path.join(categoryPath, file)
        const indexPath = path.join(categoryPath, file, 'index.md')

        if (!fs.statSync(filePath).isDirectory()) {
          console.log(`Skipping ${route}`)
          return
        }

        // ディレクトリをコピーするリストに挿入
        assetRoutes.push(route)

        console.log(`Loading: ${route}`)

        try {
          let content = fs.readFileSync(indexPath, { encoding: 'utf8' })

          const schemaRegExp = /-+\n([\s\S]+?)\n-+\n/
          if (!content.match(schemaRegExp)) {
            console.warn(`Schema not found. Skipped: ${route}`)
            return
          }

          content = content.replace(schemaRegExp, '')
          const schemaStr = RegExp.$1
          console.log(schemaStr)
          const payload = {};

          ['title_ja', 'title_en', 'creator', 'materials', 'year'].forEach((key) => {
            // eslint-disable-next-line no-useless-escape
            if (schemaStr.match(new RegExp(`^${key}\s*:\s*(.+)$`, 'm'))) {
              payload[key] = RegExp.$1
            }
          })

          payload.content = md.render(content)

          routes.push({
            route,
            payload
          })
        } catch (e) {
          console.error(e)
        }
      })
    })

    console.log(routes)
    return routes
  })

  this.nuxt.hook('generate:routeCreated', ({ route, path: pathName }) => {
    if (!assetRoutes.includes(route)) return

    console.log(`Copying assets: ${route}`)

    const source = path.join(workDir, route, '**')
    const dist = path.join(path.dirname(pathName))

    cpx.copySync(source, dist)
  })
};
