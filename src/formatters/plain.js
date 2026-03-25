// src/formatters/plain.js
const formatValue = (value) => {
  if (value === undefined) return '[undefined]' // Можно заменить на null или другую метку
  if (value && typeof value === 'object') {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const iter = (diffTree, parent = '') => {
  const lines = diffTree.flatMap((node) => {
    const property = parent ? `${parent}.${node.key}` : node.key

    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${formatValue(node.value2)}`
      case 'removed':
        return `Property '${property}' was removed`
      case 'updated':
        return `Property '${property}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`
      case 'nested':
        return iter(node.children, property)
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })
  return lines.join('\n')
}

module.exports = (diffTree) => iter(diffTree)
