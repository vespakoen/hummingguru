const fs = require('fs')
const http = require('http')
const uuid = require('uuid')
const url = require('url')
const concat = require('concat-stream')
const spawn = require('child_process').spawn
const Busboy = require('busboy')
const {
  handleUpload,
  handleDownload,
  handleCreateHumm
} = require('./src/humms')

const PORT = process.env.SERVER_PORT || 8080

function corsify(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
}

function handleRequest(req, res) {
  // cors
  corsify(res)

  // get pathname
  var pathname = url.parse(req.url).pathname

  // routes
  if (pathname === '/upload') {
    handleUpload(req, res)
  } else if (pathname.startsWith('/humm')) {
    req.params = {
      filename: pathname.split('/')[2]
    }
    handleDownload(req, res)
  } else if (pathname === '/api/humms') {
    handleCreateHumm(req, res)
  }
}

const server = http.createServer(handleRequest)
server.listen(PORT, () => {
  console.log("Server listening on: http://localhost:%s", PORT)
})
