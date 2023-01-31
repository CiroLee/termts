#!/usr/bin/env node

// 命令行彩色输出
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import pkg from '../package.json';
// modules
import { bannerWriter } from './module/banner';
import { updateVersion } from './module/version';

// 允许自定义version和help
const argv = yargs(hideBin(process.argv)).help(false).version(false);
const parsedArgv = argv.parseSync();
const query = parsedArgv._;

// 自定义help信息
function showHelper() {
  const helps = `Usage tool <methods> [options]

-v,--version                               output the version number
-h,--help                                  show help info

Methods:
banner <bannerUrl> [filepath] [title]      append a banner to the top of the markdown file
version                                    update version field of package interactively
  `;
  console.log(helps);
}

(function () {
  const { v, version, h, help } = parsedArgv;
  if (v || version) {
    console.log(chalk.green(pkg.version));
    process.exit(0);
  }
  if (h || help) {
    showHelper();
    process.exit(0);
  }

  switch (query[0]) {
    case 'banner':
      bannerWriter(query[1] as string, parsedArgv.path as string, parsedArgv.title as string);
      break;
    case 'version':
      updateVersion();
      break;
  }
})();
