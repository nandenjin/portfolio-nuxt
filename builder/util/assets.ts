import { promises as fs, Dirent } from 'fs'
import { createHash } from 'crypto'
import { join, resolve, dirname } from 'path'
import sharp from 'sharp'
import consola from 'consola'

const SIZES = [1600, 1024, 768, 320]

export interface copyAssetsCache{
  createdAt: number
  hashes: {
    [key: string]: string
  }
}

export interface copyAssetsOption {
  cache?: boolean
}

const cacheFile = resolve(__dirname, '../../node_modules/.cache/builder-module/cache.json')

export async function copyAssets (src: string, dist: string, option: copyAssetsOption = {}) {
  let cache: copyAssetsCache = { createdAt: Date.now(), hashes: {} }
  const newCache = { createdAt: Date.now(), hashes: {} }

  if (option.cache) {
    try {
      cache = require(cacheFile)
      consola.info(`Cache for assets builder enabled! To clean up, remove: ${cacheFile}`)
    } catch (e) {
      consola.error(`Failed to load cache data: ${cacheFile}`)
      consola.debug(e)
    }
  }

  const tasks: { ent: Dirent, entPath: string, distPath: string }[] = []

  /** ディレクトリ内のエントリを再帰的に探索する */
  const findEntry = async (path: string, dist: string) => {
    const ents = await fs.readdir(path, { withFileTypes: true })

    for (const ent of ents) {
      const entPath = join(path, ent.name)
      const distPath = join(dist, ent.name)

      if (ent.name.match(/^\./)) { continue }
      if (ent.isDirectory()) {
        await findEntry(entPath, distPath)
      } else if (ent.isFile()) {
        tasks.push({ ent, entPath, distPath })
      }
    }
  }

  await findEntry(src, dist)

  // 書き出し先の作成
  await fs.mkdir(dist, { recursive: true })

  let cachedCount = 0; let errorCount = 0; let succeedCount = 0
  const errors: { e: Error, entPath: string }[] = []
  const updateProgress = () => process.stderr.write(`\rBuilding assets: ${succeedCount} completed, ${cachedCount} from cached and ${errorCount} failed in ${tasks.length} entries.`)
  for (const { ent, entPath, distPath } of tasks) {
    try {
      const fileContent = await fs.readFile(entPath)
      let hashString: string = ''

      // キャッシュがあれば更新判定する
      if (option.cache) {
        const hash = createHash('md5')
        hash.update(fileContent)
        hashString = hash.digest('base64')

        if (cache.hashes[entPath]) {
          try {
            // 書き出し先が存在するか
            await fs.stat(distPath)

            // ハッシュが一致したらスキップ
            if (hashString === cache.hashes[entPath]) {
              cachedCount++
              newCache.hashes[entPath] = cache.hashes[entPath]
              updateProgress()
              continue
            }
          } catch (_) {
          }
        }
      }

      await fs.mkdir(dirname(distPath), { recursive: true })
      await fs.writeFile(distPath, fileContent)

      if (ent.name.match(/^(.+)\.(jpg|png|gif|webp)$/)) {
        const input = sharp(fileContent)
        for (const size of SIZES) {
          const jpgDistPathWithSize = join(dist, `${RegExp.$1}_${size}w.jpg`)
          const webpDistPathWithSize = join(dist, `${RegExp.$1}_${size}w.webp`)
          const data = input.clone().resize(size)
          await data.toFile(jpgDistPathWithSize)
          await data.toFile(webpDistPathWithSize)
        }
      }

      // キャッシュの格納
      if (option.cache) {
        newCache.hashes[entPath] = hashString
      }

      succeedCount++
      updateProgress()
    } catch (e) {
      errorCount++
      errors.push({ e, entPath })
      updateProgress()
    }
  }
  process.stderr.write('\n')
  for (const { e, entPath } of errors) {
    consola.error(`Failed to convert assets: ${entPath}`)
    consola.log(e)
  }

  if (option.cache) {
    // キャッシュの保存
    try {
      await fs.mkdir(dirname(cacheFile), { recursive: true })
      await fs.writeFile(cacheFile, JSON.stringify(newCache, null, 2), { encoding: 'utf-8' })
    } catch (e) {
      consola.debug(e)
      consola.warn('Failed to save asset builder cache.')
    }
  }
}
