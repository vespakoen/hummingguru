const { parseJsonRequest } = require('./utils')
const db = require('./db')

function createConvertStream(format, inputStream) {
  const converter = spawn('/usr/local/bin/ffmpeg', ['-i', 'pipe:0', '-f', format, 'pipe:1'])
  converter.stderr.on('data', error => {
    console.error(error.toString())
  })
  inputStream.pipe(converter.stdin)
  return converter.stdout
}

function handleUpload(req, res) {
  const busboy = new Busboy({ headers: req.headers })
  const id = uuid.v4()
  const audioPath = `/tmp/${id}`
  const mp3File = `${audioPath}.mp3`
  const wavFile = `${audioPath}.wav`
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    const toMp3 = createConvertStream('mp3', file)
    const toWav = createConvertStream('wav', file)
    let mp3Finished = false
    let wavFinished = false
    toWav
      .on('end', () => {
        wavFinished = true
        if (mp3Finished) res.end(id)
      })
      .pipe(fs.createWriteStream(wavFile))
    toMp3
      .on('end', () => {
        mp3Finished = true
        if (wavFinished) res.end(id)
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

function endJson(res, json) {
  res.setHeader('content-type', 'application/json')
  res.end(JSON.stringify(json))
}

function handleCreateHumm(req, res) {
  parseJsonRequest(req)
    .then(humm => {
      db.put(`humms/${humm.id}`, humm, (err, res) => {
        if (err) {
          endJson(res, { error: err.message })
        }
        endJson(res, { success: true })
      })
    })
    .catch(err => res.end(JSON.stringify({ error: err.message })))
}

module.exports = {
  handleUpload,
  handleDownload,
  handleCreateHumm
}
