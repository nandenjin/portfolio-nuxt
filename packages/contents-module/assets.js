/* eslint-disable no-console */

const fs = require('fs').promises
const path = require('path')
const sharp = require('sharp')

const SIZES = [1600, 1024, 768, 320]

export async function copyAssets(src, dist) {
  const ents = await fs.readdir(src, { withFileTypes: true })
  await fs.mkdir(dist, { recursive: true })

  for (let i = 0; i < ents.length; i++) {
    const ent = ents[i]
    const entPath = path.join(src, ent.name)
    const distPath = path.join(dist, ent.name)
    if (ent.isDirectory()) {
      copyAssets(entPath, distPath)
    } else if (ent.name.match(/^(.+)\.(jpg|png|gif|webp)$/)) {
      const input = sharp(entPath)
      SIZES.forEach((size) => {
        const jpgDistPathWithSize = path.join(dist, `${RegExp.$1}_${size}w.jpg`)
        const webpDistPathWithSize = path.join(dist, `${RegExp.$1}_${size}w.webp`)
        const data = input.clone().resize(size)
        data.toFile(jpgDistPathWithSize)
        data.toFile(webpDistPathWithSize)
      })
    } else {
      fs.copyFile(entPath, distPath)
    }
  }
}
