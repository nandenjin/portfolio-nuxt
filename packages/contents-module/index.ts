import * as fs from 'fs'
import * as path from 'path'
import { Module, Configuration } from '@nuxt/types'
import express from 'express'
import consola from 'consola'
import { copyAssets } from './assets'

import { transformHTML } from './util'
export { transformHTML }

const tmpDir = path.join(__dirname, '../../tmp')
const workDir = path.join(tmpDir, './contents')
const pagesDir = path.join(workDir, './json/pages')
const assetsDir = path.join(workDir, './markdown/assets')

const contentModule: Module = function () {
  // コンテンツのデータからルートを生成
  this.nuxt.hook('generate:extendRoutes', routes =>
    extendRoutesWithPages(routes, pagesDir)
  )

  // 生成済み各ページへのアセットコピー
  if (this.options.generate && this.options.generate.dir) {
    const assetDistDir = path.join(this.options.generate.dir, 'assets')
    this.nuxt.hook('generate:distCopied', () =>
      copyAssets(assetsDir, assetDistDir)
    )
  }

  // devモードでclientにcontentリポジトリの内容を配信するサーバ
  const contentServer = express()

  // アセットの配信
  // サイズを一旦外してリダイレクト
  contentServer.use('/assets', (req, res, next) => {
    if (req.path.match(/^(.+)_[0-9]+w\.(jpg|png|gif|webp)/)) {
      res.redirect(path.join('/assets', `${RegExp.$1}.jpg`))
    } else {
      next()
    }
  })
  // fetchしたディレクトリから静的に配信
  contentServer.use('/assets', express.static(assetsDir))

  this.addServerMiddleware(contentServer)
}

/**
 * ディレクトリ配下のファイルツリーからrouteを生成
 * @param {string?} root
 */
export function getRoutes(root = pagesDir): string[] {
  const routes: string[] = []

  fs.readdirSync(root).forEach(item => {
    const itemPath = path.join(root, item)

    try {
      const stat = fs.statSync(itemPath)

      // ディレクトリが出現したら、再帰的に探索する
      if (stat.isDirectory()) {
        routes.push(...getRoutes(itemPath).map(p => path.join(item, p)))

        // Markdownデータを発見したらルートに追加、ただしindexは無視
        // * Note: 今後サブディレクトリ以下にindexを置くような事が起きたら要修正
      } else if (
        path.extname(itemPath) === '.json' &&
        !itemPath.match(/\/_?index\.json$/)
      ) {
        routes.push(path.basename(item, '.json'))
      }
    } catch (e) {
      consola.error(e)
    }
  })

  return routes
}

/**
 * routesに対しcontentリポジトリの内容を元に拡張
 * @param routes
 * @param pagesDir
 */
export function extendRoutesWithPages(
  routes: Configuration['router']['routes'],
  pagesDir: string
): void {
  const newRoutes = getRoutes(pagesDir)
  routes.push(...newRoutes.map(route => ({ path: route })))
}

export default contentModule
