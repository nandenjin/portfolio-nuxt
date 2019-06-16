/* eslint no-console: 0 */

const fs = require('fs')
const path = require('path')

const express = require('express')
const { getPayload } = require('./reader')
const { copyAssets } = require('./assets')

export default function Contents() {
  const tmpDir = path.join(__dirname, '../../tmp')
  const workDir = path.join(tmpDir, 'contents')
  const pagesDir = path.join(workDir, 'pages')
  const assetsDir = path.join(workDir, 'assets')

  // コンテンツのデータからルートを生成
  this.nuxt.hook('generate:extendRoutes', routes => extendRoutesWithPages(routes, pagesDir))

  // 生成済み各ページへのアセットコピー
  const assetDistDir = path.join(this.options.generate.dir, 'assets')
  this.nuxt.hook('generate:distCopied', () => copyAssets(assetsDir, assetDistDir))

  const { dst: readerDistPath } = this.addTemplate({
    src: path.resolve(__dirname, 'reader.js')
  })
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      readerDistPath,
      pagesDir
    }
  })

  const contentServer = express()
  contentServer.use('/assets', (req, res, next) => {
    if (req.path.match(/^(.+)_[0-9]+w\.(jpg|png|gif|webp)/)) {
      res.redirect(path.join('/assets', `${RegExp.$1}.jpg`))
    } else next()
  })
  contentServer.use('/assets', express.static(assetsDir))
  contentServer.get('/payload/:route([\\s\\S]+).json', (req, res) => {
    res.json(getPayload(req.params.route, pagesDir))
  })

  this.addServerMiddleware(contentServer)
}

function getRoutes(root) {
  const routes = []

  fs.readdirSync(root).forEach((item) => {
    const itemPath = path.join(root, item)

    try {
      const stat = fs.statSync(itemPath)

      if (stat.isDirectory()) {
        routes.push(...getRoutes(itemPath).map(p => path.join(item, p)))
      } else if (path.extname(itemPath) === '.md') {
        routes.push(path.basename(item, '.md'))
      }
    } catch (e) {}
  })

  return routes
}

function extendRoutesWithPages(routes, pagesDir) {
  for (let i = 0; i < routes.length; i++) {
    ['/works', '/news'].includes(routes[i].route)
    routes[i].payload = getPayload(routes[i].route, pagesDir)
  }
  console.log(routes)
  const newRoutes = getRoutes(pagesDir)

  newRoutes.forEach((route) => {
    const payload = getPayload(route, pagesDir)

    // ルートに追加
    routes.push({
      route,
      payload
    })
  })

  console.log(routes)
  return routes
}