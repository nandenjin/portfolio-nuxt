import { contentFunc } from '@nuxt/content/types/content'
import { useContext } from '@nuxtjs/composition-api'

/* eslint-disable camelcase */
export interface WorkMeta {
  title_ja: string
  title_en: string
  thumbnail: string
  materials: string
  year: string
  info: string
  tags: string
}

export type NuxtRootContext = ReturnType<typeof useContext> & {
  $content: contentFunc
}
