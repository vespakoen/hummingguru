function dbPut(db, key, value, opts) {
  return new Promise((resolve, reject) => {
    db.put(key, value, opts, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

function dbGet(db, key, opts) {
  return new Promise((resolve, reject) => {
    db.get(key, opts, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

function dbDel(db, key, opts) {
  return new Promise((resolve, reject) => {
    db.del(key, opts, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

function dbBatch(db, ops, opts) {
  return new Promise((resolve, reject) => {
    db.batch(ops, opts, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

module.exports = {
  dbPut,
  dbGet,
  dbDel,
  dbBatch
}
