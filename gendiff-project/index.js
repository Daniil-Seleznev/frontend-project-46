// src/index.js
const fs = require('fs');
const path = require('path');
const parseFile = require('./src/parsers');
const getFormatter = require('./src/formatters');

// Вспомогательная функция для рекурсивного сравнения
const buildDiff = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  return keys.map((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 && typeof val1 === 'object' && val2 && typeof val2 === 'object' && !Array.isArray(val1) && !Array.isArray(val2)) {
      return { key, type: 'nested', children: buildDiff(val1, val2) };
    }

    if (!(key in obj2)) return { key, type: 'removed', value1: val1 };
    if (!(key in obj1)) return { key, type: 'added', value2: val2 };
    if (val1 !== val2) return { key, type: 'updated', value1: val1, value2: val2 };
    if (val1 === undefined && val2 === undefined) return null;  // Ignore undefined values

    return { key, type: 'unchanged', value1: val1 };
  }).filter(Boolean);  // Filter out null/undefined entries
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diffTree = buildDiff(data1, data2);
  const formatter = getFormatter(formatName);
  return formatter(diffTree);
};

module.exports = genDiff;
