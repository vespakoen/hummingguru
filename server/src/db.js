const levelup = require('level')
const sublevel = require('level-sublevel')

module.exports = sublevel(levelup('/data/hummingguru', {
  valueEncoding: 'json'
}))
