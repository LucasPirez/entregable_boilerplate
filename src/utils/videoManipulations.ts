const ffmpeg = require('ffmpeg-static')
const { spawn } = require('node:child_process')

const handleFFmpegProcess = (resolve, ffmpeg) => {
  ffmpeg.stdout.on('data', (data: string) => {
    console.log('stdout: ', data)
  })
  ffmpeg.stderr.on('data', (data: string) => {
    console.log('stderr: ', data.toString())
  })
  ffmpeg.on('exit', (code: number) => {
    console.log('child process exited with code ', code)

    if (code === 0) {
      resolve('se completo con exito')
    } else {
      resolve('Ha ocurrido un error')
    }
  })
}

export const convertVideoWithPaths = (filein: string, fileout: string) =>
  new Promise((resolve, rejected) => {
    const comando = spawn(ffmpeg, ['-i', filein, fileout])
    handleFFmpegProcess(resolve, comando)
  })

export const mutedVideos = (filein: string, fileOut: string) =>
  new Promise((resolve, rejected) => {
    const comando = spawn(ffmpeg, ['-i', filein, '-an', fileOut])
    handleFFmpegProcess(resolve, comando)
  })
