// src/parsers.js
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const parseFile = filepath => {
  const ext = path.extname(filepath).toLowerCase()
  const content = fs.readFileSync(filepath, 'utf8')
  if (ext === '.json') {
    return JSON.parse(content)
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(content)
  }
  throw new Error(`Unsupported file extension: ${ext}`)
}
module.exports = parseFile
