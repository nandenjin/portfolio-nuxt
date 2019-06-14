/* eslint-disable no-console */
import * as path from 'path'
import axios from 'axios'
import { getPayload } from './<%= options.readerDistPath %>'

const pagesDir = '<%= options.pagesDir %>'

export default (context) => {
  context.getContent = async (route) => {
    if (context.isDev) {
      try {
        let payload
        if (process.client) {
          const { data } = await axios.get(path.join('/payload', route) + '.json')
          payload = data
        } else if (process.server) {
          payload = getPayload(path.join(pagesDir, route) + '.md')
        }
        return payload
      } catch (e) {
        console.error(e)
        return null
      }
    } else {
      const payload = context.getPayload(route)
      return payload
    }
  }
}
