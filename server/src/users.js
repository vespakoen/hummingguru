const uuid = require('uuid')
const debug = require('debug')
const { endJson, parseJsonRequest } = require('./utils')
const { dbPut, dbGet } = require('./level-promise')
const db = require('./db')

const userDb = db.sublevel('users')
const userByFacebookIdDb = db.sublevel('user-by-facebook-id')
const log = debug('users')

function handleCreateFacebookUser(req, res) {
  parseJsonRequest(req)
    .then(facebookProfile => {
      const userId = '' + Date.now()
      const user = {
        id: userId,
        lastHummId: 0,
        facebookProfile
      }
      dbPut(userDb, userId, user)
        .then(() => dbPut(userByFacebookIdDb, facebookProfile.id, userId))
        .then(() => endJson(res, user))
        .catch(err => endJson(res, { error: err.message }, 400))
    })
}

function handleGetUserByFacebookId(req, res) {
  dbGet(userByFacebookIdDb, req.params.facebookId)
    .then(userId => dbGet(userDb, userId))
    .then(user => endJson(res, user))
    .catch(err => endJson(res, { error: err.message }, 400))
}

module.exports = {
  handleGetUserByFacebookId,
  handleCreateFacebookUser
}
