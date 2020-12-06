import { resolve, join } from 'path'
import consola from 'consola'
import { Module } from '@nuxt/types'
import { copyAssets } from './util/assets'

const builderModule: Module = function ExampleModule () {
  const workDir = resolve(__dirname, '../content')
  const assetsDir = join(workDir, './assets')
  const assetDistDir = join(this.options.generate.dir || resolve(__dirname, '../dist'), 'assets')

  this.nuxt.hook('build:before', async () => {
    await copyAssets(assetsDir, assetDistDir, { cache: true })
    consola.success('All assets from content repo are now ready')
  })
}

export default builderModule
