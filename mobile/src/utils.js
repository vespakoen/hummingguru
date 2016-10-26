import config from '../config'

function bodyRequest(method) {
  return (uri, json) => {
    let opts = {}
    if (method !== 'GET') {
      opts = {
        method,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(json)
      }
    }
    return fetch(`${config.API_URL}/${uri}`, opts)
      .then(res => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error('Bad response from server')
        }
        return res
      })
      .then(res => res.json())
  }
}

export const getJson = bodyRequest('GET')
export const postJson = bodyRequest('POST')
export const putJson = bodyRequest('PUT')
