var levelup = require('level')

module.exports = levelup('/data/hummingguru', {
  valueEncoding: 'json'
})
