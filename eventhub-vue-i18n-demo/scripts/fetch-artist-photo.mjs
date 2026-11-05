/**
 * Optional one-time fetch of Sanchez Productions' authentic Don Toliver photograph.
 * Source: https://commons.wikimedia.org/wiki/File:Don_Toliver_by_Sanchez_Productions.jpg
 * Licensed CC BY-SA 4.0 by Sanchez Productions. Keep license attribution in footer/README.
 */
import { createWriteStream, existsSync, mkdirSync, unlinkSync, readFileSync, appendFileSync } from 'node:fs'
import { get } from 'node:https'
import { join } from 'node:path'

const filename = join(process.cwd(), 'public/images/don-toliver-licensed.jpg')
const origin = 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Don_Toliver_by_Sanchez_Productions.jpg'

function enablePhoto() {
  const envFile = join(process.cwd(), '.env.local')
  const current = existsSync(envFile) ? readFileSync(envFile, 'utf8') : ''
  if (!/^VITE_PHOTO_ENABLED=true$/m.test(current)) {
    appendFileSync(envFile, `${current.endsWith('\n') || !current ? '' : '\n'}VITE_PHOTO_ENABLED=true\n`)
  }
}

if (existsSync(filename)) {
  enablePhoto()
  console.log(`Photo already exists: ${filename}; VITE_PHOTO_ENABLED=true`)
  process.exit(0)
}
mkdirSync(join(process.cwd(), 'public/images'), { recursive: true })

function fetch(url, redirects = 0) {
  if (redirects > 5) throw new Error('Too many redirects')
  return new Promise((resolve, reject) => {
    get(url, { headers: { 'User-Agent': 'EventHubUniversityDemo/1.0 (educational image attribution)' }, timeout: 15000 }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode ?? 0) && res.headers.location) {
        res.resume()
        fetch(new URL(res.headers.location, url).toString(), redirects + 1).then(resolve, reject)
        return
      }
      if (res.statusCode !== 200 || !(res.headers['content-type'] ?? '').includes('image/jpeg')) {
        res.resume()
        reject(new Error(`Photo request failed: HTTP ${res.statusCode} (${res.headers['content-type']})`))
        return
      }
      let size = 0
      const chunks = []
      res.on('data', (chunk) => { chunks.push(chunk); size += chunk.length })
      res.on('end', () => {
        const bytes = Buffer.concat(chunks)
        if (size < 100_000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
          reject(new Error('Invalid or unexpectedly small JPEG. Nothing written.'))
          return
        }
        const stream = createWriteStream(filename)
        stream.on('finish', () => resolve(size))
        stream.on('error', reject)
        stream.end(bytes)
      })
      res.on('error', reject)
    }).on('timeout', () => reject(new Error('Photo request timed out'))).on('error', reject)
  })
}

try {
  const size = await fetch(origin)
  enablePhoto()
  console.log(`Saved licensed Don Toliver photo (${Math.round(size / 1024)} KiB); set VITE_PHOTO_ENABLED=true`)
} catch (error) {
  if (existsSync(filename)) unlinkSync(filename)
  console.error(`Could not fetch the photo: ${String(error)}`)
  process.exitCode = 1
}
