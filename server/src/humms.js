const fs = require('fs')
const spawn = require('child_process').spawn
const uuid = require('uuid')
const Busboy = require('busboy')
const debug = require('debug')
const levelPromisify = require('level-promisify')
const { parseJsonRequest, endJson } = require('./utils')
const { dbPut, dbGet } = require('./level-promise')
const db = require('./db')

const hummDb = db.sublevel('humms')
const userDb = db.sublevel('users')
const log = debug('humms')

function createConvertStream(format, inputStream) {
  const converter = spawn('/usr/local/bin/ffmpeg', ['-i', 'pipe:0', '-f', format, 'pipe:1'])
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
  return fs.createReadStream(`/tmp/${safeFilename}`)
    .pipe(res)
}

function handleCreateHumm(req, res) {
  parseJsonRequest(req)
    .then(humm => dbPut(hummDb, humm.id, humm))
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

function handleGetNextHumm(req, res) {
  const userId = req.params.userId
  dbGet(userDb, userId)
    .then(user => {
      hummDb.createReadStream({
        gt: user.lastHummId,
        limit: 1
      })
      .on('data', data => {
        const { key: hummId, value: humm } = data
        const userUpdate = Object.assign({}, user, {
          lastHummId: hummId
        })
        dbPut(userDb, userId, userUpdate)
          .then(() => endJson(res, humm))
          .catch(err => endJson(res, { error: err.message }, 400))
      })
    })
    .catch(err => endJson(res, { error: err.message }, 400))
}

module.exports = {
  handleUpload,
  handleDownload,
  handleCreateHumm,
  handleGetHumm,
  handleGetNextHumm
}
