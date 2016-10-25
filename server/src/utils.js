function parseJsonRequest(req, cb) {
  return new Promise((resolve, reject) => {
    req.setEncoding('utf8')
    req.pipe(concat((body => {
      const json = JSON.parse(body)
      resolve(json)
    })))
  })
  .catch(err => {
    throw new Error('Unable to parse JSON')
  })
}

module.exports = {
  parseJsonRequest
}
