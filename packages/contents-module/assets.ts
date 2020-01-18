/* eslint-disable no-console */

import { promises as fs } from 'fs'
import * as path from 'path'
import sharp from 'sharp'
const consola = require('consola')

const SIZES = [1600, 1024, 768, 320]

export async function copyAssets (src, dist) {
  const ents = await fs.readdir(src, { withFileTypes: true })
  await fs.mkdir(dist, { recursive: true })

  for (let i = 0; i < ents.length; i++) {
    const ent = ents[i]
    const entPath = path.join(src, ent.name)
    const distPath = path.join(dist, ent.name)

    try {
      if (ent.isDirectory()) {
        await copyAssets(entPath, distPath)
      } else {
        await fs.copyFile(entPath, distPath)

        if (ent.name.match(/^(.+)\.(jpg|png|gif|webp)$/)) {
          const input = sharp(entPath)
          for (const size of SIZES) {
            const jpgDistPathWithSize = path.join(dist, `${RegExp.$1}_${size}w.jpg`)
            const webpDistPathWithSize = path.join(dist, `${RegExp.$1}_${size}w.webp`)
            const data = input.clone().resize(size)
            await data.toFile(jpgDistPathWithSize)
            await data.toFile(webpDistPathWithSize)
          }
        }
      }

      consola.success(entPath)
    } catch (e) {
      consola.error(entPath)
    }
  }
}
