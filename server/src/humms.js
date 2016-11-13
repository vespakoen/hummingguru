const fs = require('fs')
const spawn = require('child_process').spawn
const Busboy = require('busboy')
const debug = require('debug')
const { parseJsonRequest, endJson } = require('./utils')
const { dbPut, dbGet } = require('./level-promise')
const db = require('./db')

const hummDb = db.sublevel('humms')
const log = debug('humms')

function createConvertStream(format, inputStream) {
  const converter = spawn('ffmpeg', ['-i', 'pipe:0', '-f', format, 'pipe:1'])
  converter.stderr.on('data', error => {
    log('Error while decoding audio: %s', error.toString())
  })
  inputStream.pipe(converter.stdin)
  return converter.stdout
}

function handleUpload(req, res) {
  const busboy = new Busboy({ headers: req.headers })
  const id = '' + Date.now()
  const audioPath = `/tmp/${id}`
  const mp3File = `${audioPath}.mp3`
  const wavFile = `${audioPath}.wav`
  busboy.on('file', (fieldname, file/* , filename, encoding, mimetype*/) => {
    const toMp3 = createConvertStream('mp3', file)
    const toWav = createConvertStream('wav', file)
    let mp3Finished = false
    let wavFinished = false
    toWav
      .on('end', () => {
        wavFinished = true
        if (mp3Finished) res.end('' + id) // eslint-disable-line prefer-template
      })
      .pipe(fs.createWriteStream(wavFile))
    toMp3
      .on('end', () => {
        mp3Finished = true
        if (wavFinished) res.end('' + id) // eslint-disable-line prefer-template
      })
      .pipe(fs.createWriteStream(mp3File))
  })
  req.pipe(busboy)
}

function handleDownload(req, res) {
  const safeFilename = req.params.filename.replace(/\.\.\//g, '')
  const filePath = `/tmp/${safeFilename}`
  if (!fs.existsSync(filePath)) {
    return endJson(res, { error: 'Unknown recording...' }, 400)
  }

  return fs.createReadStream(filePath)
    .pipe(res)
}

function handleCreateHumm(req, res) {
  parseJsonRequest(req)
    .then(humm => {
      humm.id = '' + Date.now() // eslint-disable-line
      return dbPut(hummDb, humm.id, humm)
    })
    .then(() => endJson(res, { success: true }))
    .catch(err => {
      endJson(res, {
        error: err.message
      }, 400)
    })
}

function handleGetHumm(req, res) {
  dbGet(hummDb, req.params.id)
    .then(humm => endJson(res, humm))
    .catch(err => endJson(res, { error: err.message }, 400))
}

module.exports = {
  handleUpload,
  handleDownload,
  handleCreateHumm,
  handleGetHumm
}
