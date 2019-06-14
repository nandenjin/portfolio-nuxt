/* eslint-disable no-console */
import * as path from 'path'
import axios from 'axios'
import { getPayload } from './<%= options.readerDistPath %>'

const pagesDir = '<%= options.pagesDir %>'

export default (context) => {
  context.getContent = async (route) => {
    if (context.isDev) {
      try {
        if (process.client) {
          const { data } = await axios.get(path.join('/content/payload', route) + '.json')
          return data
        } else if (process.server) {
          const payload = getPayload(path.join(pagesDir, route) + '.md')
          return payload
        }
      } catch (e) {
        console.error(e)
        return null
      }
    } else {
      return context.getPayload(route)
    }
  }
}
