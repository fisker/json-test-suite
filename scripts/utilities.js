import {Buffer} from 'node:buffer'
import fs from 'node:fs/promises'
import url from 'node:url'
import AdmZip from 'adm-zip'

async function downloadFile({url, cacheFile}) {
  let stat

  try {
    stat = await fs.stat(cacheFile)
  } catch {
    // No op
  }

  if (stat) {
    if (Date.now() - stat.mtimeMs < /* 10 hours */ 10 * 60 * 60 * 1000) {
      return
    }

    await fs.rm(cacheFile)
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Fetch '${url}' failed.`)
  }

  const arrayBuffer = await response.arrayBuffer()

  await writeRawFile(cacheFile, Buffer.from(arrayBuffer))
}

async function writeRawFile(file, content) {
  const directory = new URL('./', file)
  await fs.mkdir(directory, {recursive: true})
  return fs.writeFile(file, content)
}

function writeTextFile(file, content) {
  return writeRawFile(
    file,
    '// Generated file, do NOT edit' + '\n\n' + content + '\n',
  )
}

function* readZipFile(file, filter) {
  var zip = new AdmZip(url.fileURLToPath(file))
  for (const file of zip.getEntries()) {
    if (!filter(file)) {
      continue
    }

    yield {
      name: file.entryName,
      data: file.getData().toString(),
    }
  }
}

export {downloadFile, readZipFile, writeTextFile}
