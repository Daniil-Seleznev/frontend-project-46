/* global test, expect */
const path = require('path');
const genDiff = require('../index.js');

const file1Json = path.join(__dirname, '__fixtures__/file1.json');
const file2Json = path.join(__dirname, '__fixtures__/file2.json');
const file1Yaml = path.join(__dirname, '__fixtures__/file1.yml');
const file2Yaml = path.join(__dirname, '__fixtures__/file2.yml');
const nested1 = path.join(__dirname, '__fixtures__/nested1.yml');
const nested2 = path.join(__dirname, '__fixtures__/nested2.yml');
const json1Json = path.join(__dirname, '__fixtures__/json1.json');
const json2Json = path.join(__dirname, '__fixtures__/json2.json');

test('gendiff nested json files', () => {
  const result = genDiff(file1Json, file2Json);
  expect(result).toContain('host: hexlet.io');
  expect(result).toContain('- timeout: 50');
  expect(result).toContain('+ timeout: 20');
});

test('gendiff nested yaml files', () => {
  const result = genDiff(file1Yaml, file2Yaml);
  expect(result).toContain('common: {');
  expect(result).toContain('+ follow: false');
  expect(result).toContain('- setting2: 200');
  expect(result).toContain('+ setting5: {');
});

test('gendiff plain format', () => {
  const result = genDiff(nested1, nested2, 'plain');

  expect(result).toContain("Property 'common.follow' was added with value: false");
  expect(result).toContain("Property 'common.setting2' was removed");
  expect(result).toContain("Property 'common.setting3' was updated. From true to null");
  expect(result).toContain("Property 'common.setting5' was added with value: [complex value]");
  expect(result).toContain("Property 'group1.nest' was updated. From [complex value] to 'str'");
  expect(result).toContain("Property 'group3' was added with value: [complex value]");
});

test('gendiff json files', () => {
  const result = genDiff(json1Json, json2Json, 'json');
  const expected = JSON.stringify([
    {
      "key": "common",
      "type": "nested",
      "children": [
        {
          "key": "setting1",
          "type": "unchanged",
          "value1": "Value1"
        },
        {
          "key": "setting2",
          "type": "unchanged",
          "value1": "Value2"
        }
      ]
    },
    {
      "key": "group1",
      "type": "nested",
      "children": [
        {
          "key": "setting1",
          "type": "unchanged",
          "value1": "Value3"
        }
      ]
    }
  ], null, 2);
  expect(result).toBe(expected);
});
