#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';
import parseFile from '../src/parsers.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .argument('<filepath1>', 'first file')
  .argument('<filepath2>', 'second file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    // Передаём строки, а не объект
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

program.parse();

