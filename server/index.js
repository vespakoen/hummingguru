const http = require('http')
const url = require('url')
const debug = require('debug')
const {
  handleUpload,
  handleDownload,
  handleCreateHumm,
  handleGetHumm
} = require('./src/humms')
const {
  handleGetUserByFacebookId,
  handleCreateFacebookUser,
  handleGetNextHumm,
  handleGetCurrentHumm
} = require('./src/users')

const log = debug('index')
const PORT = process.env.SERVER_PORT || 8080

function corsify(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
}

function handleRequest(req, res) { // eslint-disable-line consistent-return
  // cors
  corsify(res)

  // get pathname
  const pathname = url.parse(req.url).pathname
  log('handleRequest', pathname)
  // routes
  if (pathname === '/upload') {
    // POST /upload
    return handleUpload(req, res)
  } else if (pathname.startsWith('/humm')) {
    // GET /humm/:uuid
    req.params = { // eslint-disable-line no-param-reassign
      filename: pathname.split('/')[2]
    }
    return handleDownload(req, res)
  } else if (pathname === '/api/humms') {
    // POST /api/humms
    return handleCreateHumm(req, res)
  } else if (pathname.startsWith('/api/humms/')) {
    // GET /api/humms/:id
    req.params = { // eslint-disable-line no-param-reassign
      id: pathname.split('/')[3]
    }
    return handleGetHumm(req, res)
  } else if (pathname.startsWith('/api/users/') && pathname.endsWith('/nexthumm')) {
    // GET /api/nexthumm/:userId
    req.params = { // eslint-disable-line no-param-reassign
      userId: pathname.split('/')[3]
    }
    return handleGetNextHumm(req, res)
  } else if (pathname.startsWith('/api/users/') && pathname.endsWith('/currenthumm')) {
    // GET /api/currenthumm/:userId
    req.params = { // eslint-disable-line no-param-reassign
      userId: pathname.split('/')[3]
    }
    return handleGetCurrentHumm(req, res)
  } else if (pathname.startsWith('/api/users/facebook/')) {
    req.params = { // eslint-disable-line no-param-reassign
      facebookId: pathname.split('/')[4]
    }
    return handleGetUserByFacebookId(req, res)
  } else if (pathname === '/api/users/facebook') {
    return handleCreateFacebookUser(req, res)
  }
  res.writeHead(404)
  res.end('Not found')
}

const server = http.createServer(handleRequest)
server.listen(PORT, '0.0.0.0', () => {
  log('Server listening on: http://0.0.0.0:%s', PORT)
})
