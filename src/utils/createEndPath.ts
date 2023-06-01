const path = require('path')
const fs = require('fs')

export const arrFiles = async (path: string): Promise<string[]> => {
  const arr = await fs.promises.readdir(path)
  return arr.filter((u: string) => u.includes('.'))
}

export const createEndPath = async (
  arg: 'mp4' | 'webm'
): Promise<string | undefined> => {
  const videosFolder = path.resolve('src', 'files')
  const arr = await arrFiles(videosFolder)

  return arr.find((el) => {
    const arrEl = el.split('.')
    if (arrEl[arrEl.length - 1] === arg) {
      return el
    }
  })
}
