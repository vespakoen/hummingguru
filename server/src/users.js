const debug = require('debug')
const { endJson, parseJsonRequest } = require('./utils')
const { dbPut, dbGet } = require('./level-promise')
const db = require('./db')

const userDb = db.sublevel('users')
const hummDb = db.sublevel('humms')
const userByFacebookIdDb = db.sublevel('user-by-facebook-id')
const log = debug('users')

function handleCreateFacebookUser(req, res) {
  parseJsonRequest(req)
    .then(facebookProfile => {
      log('handleCreateFacebookUser', facebookProfile)
      const userId = '' + Date.now()
      const user = {
        id: userId,
        lastHummId: '0',
        facebookProfile
      }
      dbPut(userDb, userId, user)
        .then(() => dbPut(userByFacebookIdDb, facebookProfile.id, userId))
        .then(() => endJson(res, user))
        .catch(err => endJson(res, { error: err.message }, 400))
    })
}

function handleGetUserByFacebookId(req, res) {
  log('handleGetUserByFacebookId', req.params.facebookId)
  dbGet(userByFacebookIdDb, req.params.facebookId)
    .then(userId => dbGet(userDb, userId))
    .then(user => endJson(res, user))
    .catch(err => endJson(res, { error: err.message }, 400))
}

function handleGetCurrentHumm(req, res) {
  log('handleGetCurrentHumm', req.params.userId)
  const userId = req.params.userId
  dbGet(userDb, userId)
    .then(user => {
      let foundHumm = false
      hummDb.createReadStream({
        gte: user.lastHummId,
        limit: 1
      })
      .on('data', data => {
        foundHumm = true
        const { value: humm } = data
        endJson(res, humm)
      })
      .on('end', () => {
        if (!foundHumm) {
          endJson(res, { error: 'No humms found' }, 400)
        }
      })
    })
    .catch(err => endJson(res, { error: err.message }, 400))
}

function handleGetNextHumm(req, res) {
  const userId = req.params.userId
  log('handleGetNextHumm', userId)
  dbGet(userDb, userId)
    .then(user => {
      let foundHumm = false
      hummDb.createReadStream({
        gt: user.lastHummId,
        limit: 1
      })
      .on('data', data => {
        foundHumm = true
        const { key: hummId, value: humm } = data
        const userUpdate = Object.assign({}, user, {
          lastHummId: hummId
        })
        dbPut(userDb, userId, userUpdate)
          .then(() => endJson(res, humm))
          .catch(err => endJson(res, { error: err.message }, 400))
      })
      .on('end', () => {
        if (!foundHumm) {
          endJson(res, { error: 'No humms found' }, 400)
        }
      })
    })
    .catch(err => endJson(res, { error: err.message }, 400))
}

module.exports = {
  handleGetUserByFacebookId,
  handleCreateFacebookUser,
  handleGetNextHumm,
  handleGetCurrentHumm
}
