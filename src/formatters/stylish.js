// src/formatters/stylish.js
const indent = (depth) => ' '.repeat(depth * 4)
const formatValue = (value, depth) => {
  if (value === undefined) return '[undefined]' // Или '[complex value]' по желанию
  if (value !== null && typeof value === 'object') {
    const lines = Object.entries(value).map(
      ([k, v]) => `${indent(depth + 1)}${k}: ${formatValue(v, depth + 1)}`,
    )
    return `{\n${lines.join('\n')}\n${indent(depth)}}`
  }
  return value === null ? 'null' : String(value)
}
const formatNode = (node, depth = 1) => {
  switch (node.type) {
    case 'nested':
      return `${indent(depth)}${node.key}: {\n${node.children
        .map((child) => formatNode(child, depth + 1))
        .join('\n')}\n${indent(depth)}}`
    case 'added':
      return `${indent(depth - 1)}  + ${node.key}: ${formatValue(node.value2, depth)}`
    case 'removed':
      return `${indent(depth - 1)}  - ${node.key}: ${formatValue(node.value1, depth)}`
    case 'unchanged':
      return `${indent(depth)}${node.key}: ${formatValue(node.value1, depth)}`
    case 'updated':
      return [
        `${indent(depth - 1)}  - ${node.key}: ${formatValue(node.value1, depth)}`,
        `${indent(depth - 1)}  + ${node.key}: ${formatValue(node.value2, depth)}`,
      ].join('\n')
    default:
      throw new Error(`Unknown type: ${node.type}`)
  }
}
module.exports = (diffTree) => `{\n${diffTree.map((node) => formatNode(node)).join('\n')}\n}`
