/* eslint-disable no-console */

const fs = require('fs').promises
const path = require('path')
const sharp = require('sharp')
const consola = require('consola')

const SIZES = [1600, 1024, 768, 320]

export async function copyAssets(src, dist) {
  const ents = await fs.readdir(src, { withFileTypes: true })
  await fs.mkdir(dist, { recursive: true })

  const jobs = []

  for (let i = 0; i < ents.length; i++) {
    const ent = ents[i]
    const entPath = path.join(src, ent.name)
    const distPath = path.join(dist, ent.name)

    const jobsForEntity = []

    if (ent.isDirectory()) {
      copyAssets(entPath, distPath)
    } else if (ent.name.match(/^(.+)\.(jpg|png|gif|webp)$/)) {
      const input = sharp(entPath)
      SIZES.forEach((size) => {
        const jpgDistPathWithSize = path.join(dist, `${RegExp.$1}_${size}w.jpg`)
        const webpDistPathWithSize = path.join(dist, `${RegExp.$1}_${size}w.webp`)
        const data = input.clone().resize(size)
        jobsForEntity.push(
          data.toFile(jpgDistPathWithSize),
          data.toFile(webpDistPathWithSize)
        )
      })
    } else {
      jobsForEntity.push(fs.copyFile(entPath, distPath))
    }

    Promise.all(jobsForEntity)
      .then(() => consola.success(entPath))
      .catch(() => consola.error(entPath))
  }

  return Promise.all(jobs)
}
