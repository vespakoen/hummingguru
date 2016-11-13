import {
  getJson,
  putJson,
  postJson
} from './utils'

// HUMMS

export function getHumm(id) {
  return getJson(`api/humms/${id}`)
}

export function createHumm(humm) {
  return postJson('api/humms', humm)
}

export function updateHumm(humm) {
  return putJson('api/humms', humm)
}

export function createComment(hummId, comment) {
  return postJson(`api/humms/${hummId}/comments`, comment)
}

export function updateComment(hummId, commentId, update) {
  return putJson(`api/humms/${hummId}/comments/${commentId}`, update)
}

export function markCommentAsAnswer(hummId, commentId) {
  const update = { answer: true }
  return updateComment(hummId, commentId, update)
}

// USERS

export function createFacebookUser(facebookProfile) {
  return postJson('api/users/facebook', facebookProfile)
}

export function getUserByFacebookId(facebookId) {
  return getJson(`api/users/facebook/${facebookId}`)
}

export function getNextHummForUser(userId) {
  return getJson(`api/users/${userId}/nexthumm`)
}

export function getCurrentHummForUser(userId) {
  return getJson(`api/users/${userId}/currenthumm`)
}
