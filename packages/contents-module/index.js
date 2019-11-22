/* eslint no-console: 0 */

const fs = require('fs')
const path = require('path')

const express = require('express')
const { getPayload } = require('./reader')
const { copyAssets } = require('./assets')

const tmpDir = path.join(__dirname, '../../tmp')
const workDir = path.join(tmpDir, 'contents')
const pagesDir = path.join(workDir, 'pages')
const assetsDir = path.join(workDir, 'assets')

export default function Contents () {
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

  // devモードでclientにcontentリポジトリの内容を配信するサーバ
  const contentServer = express()

  // アセットの配信
  // サイズを一旦外してリダイレクト
  contentServer.use('/assets', (req, res, next) => {
    if (req.path.match(/^(.+)_[0-9]+w\.(jpg|png|gif|webp)/)) {
      res.redirect(path.join('/assets', `${RegExp.$1}.jpg`))
    } else { next() }
  })
  // fetchしたディレクトリから静的に配信
  contentServer.use('/assets', express.static(assetsDir))

  // payloadの配信
  contentServer.get('/payload/:route([\\s\\S]+).json', (req, res) => {
    res.json(getPayload(req.params.route, pagesDir))
  })

  this.addServerMiddleware(contentServer)
}

/**
 * ディレクトリ配下のファイルツリーからrouteを生成
 * @param {string?} root
 */
export function getRoutes (root = pagesDir) {
  const routes = []

  fs.readdirSync(root).forEach((item) => {
    const itemPath = path.join(root, item)

    try {
      const stat = fs.statSync(itemPath)

      // ディレクトリが出現したら、再帰的に探索する
      if (stat.isDirectory()) {
        routes.push(...getRoutes(itemPath).map(p => path.join(item, p)))

      // Markdownデータを発見したらルートに追加、ただしindexは無視
      // * Note: 今後サブディレクトリ以下にindexを置くような事が起きたら要修正
      } else if (path.extname(itemPath) === '.md' && path.basename(item, '.md') !== 'index') {
        routes.push(path.basename(item, '.md'))
      }
    } catch (e) {}
  })

  return routes
}

/**
 * routesに対しcontentリポジトリの内容を元に拡張しpayloadを付与
 * @param {string[]} routes
 * @param {string} pagesDir
 */
export function extendRoutesWithPages (routes, pagesDir) {
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
