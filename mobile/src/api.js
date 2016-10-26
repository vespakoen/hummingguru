import {
  getJson,
  putJson,
  postJson
} from './utils'

export function getHumm(id) {
  return getJson(`api/humms/${id}`)
}

export function createHumm(humm) {
  return postJson('api/humms', humm)
}

export function getNextHumm(userId) {
  return getJson(`api/nexthumm/${userId}`)
}

export function createComment(hummId, comment) {
  return postJson(`api/comments/${hummId}`, comment)
}

export function markCommentAsAnswer(hummId, commentId) {
  return putJson(`api/mark-comment-as-answer/${hummId}/${commentId}`)
}

export function createFacebookUser(facebookProfile) {
  return postJson('api/create-facebook-user', facebookProfile)
}

export function getUserByFacebookUserId(facebookId) {
  return getJson(`api/user-by-facebook-id/${facebookId}`)
}
