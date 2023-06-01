import { Router } from 'restify-router'
import { convertVideoWithPaths, mutedVideos } from '../utils/videoManipulations'
import { createEndPath, arrFiles } from '../utils/createEndPath'

const Transform = new Router()

const path = require('path')
const fs = require('fs')

Transform.get('/mutevideos', async (req, res) => {
  try {
    const arrVideos = await arrFiles(path.resolve(`src/files`))

    arrVideos.forEach(async (videoName) => {
      const videoPath = path.resolve(`src/files/${videoName}`)
      const videoOutPath = path.resolve(`src/files/muted/muted${videoName}`)

      await mutedVideos(videoPath, videoOutPath)
    })
  } catch (error) {
    res.json({
      message: error?.message,
      error: true
    })
  }
})

Transform.get('/mp4towebm', async (req, res) => {
  try {
    const endPath = await createEndPath('mp4')

    const videosFolder = path.resolve('src', 'files', endPath)

    const videosOut = path.resolve('src/files/convert/output.webm')

    const response = await convertVideoWithPaths(videosFolder, videosOut)

    res.json({
      message: 'hola',
      codeMessage: response
    })
  } catch (error) {
    res.json({
      message: error?.message,
      error: true
    })
  }
})

Transform.get('/webmtomp4', async (req, res) => {
  const endPath = await createEndPath('webm')
  const videosFolder = path.resolve('src', 'files', endPath)

  const videosOut = path.resolve('src/files/convert/output.mp4')

  try {
    const response = await convertVideoWithPaths(videosFolder, videosOut)

    res.json({
      message: 'hola',
      codeMessage: response
    })
  } catch (error) {
    res.json({
      message: error?.message,
      error: true
    })
  }
})

export { Transform }

Transform.get('/viewwebm', (req, res, next) => {
  const videosOut = path.resolve('src/files/convert/output.webm')

  fs.readFile(videosOut, (err: string, data: object) => {
    if (err) {
      console.log(err)
      res.statusCode = 500
      res.end('Error al leer el archivo de video')
      return
    }
    // res.setHeader('Content-Type', 'output.webm')
    // res.setHeader('Content-Length', data.length)
    res.end(data)
  })
})
