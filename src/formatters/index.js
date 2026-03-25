const stylish = require('./stylish.js')
const plain = require('./plain.js')
const json = require('./json.js')
const formatters = { stylish, plain, json }

module.exports = function getFormatter(formatName = 'stylish') {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatters[formatName]
}
