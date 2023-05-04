#!/usr/bin/env node

// 命令行彩色输出
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import pkg from '../package.json';
// modules
import { bannerWriter } from './module/banner';
import { updateVersion } from './module/version';
import { gitCommitMsg } from './module/commit';
import { tree } from './module/tree';
import { winLs } from './module/win-ls';
import { repo } from './module/repo';

// 允许自定义version和help
const argv = yargs(hideBin(process.argv)).help(false).version(false).array('ignore');
const parsedArgv = argv.parseSync();
const query = parsedArgv._;

// 自定义help信息
function showHelper() {
  const helps = `Usage termts <methods> [options]

-v,--version                                             output the version number
-h,--help                                                show help info

methods:
banner <bannerUrl> [path] [title] [align] [size]         append a banner to the top of the markdown file
version                                                  update version field of package interactively
commit [lang=zh|en]                                      shortcut of git commit -m
tree [dir] [deep] [ignore]                               output the tree structure of the specified directory
ls                                                       display the contents of the current directory.like ls in linux
repo                                                     open the repository of current project on your default browser
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
      bannerWriter({
        url: query[1] as string,
        filepath: parsedArgv.path as string,
        title: parsedArgv.title as string,
        align: parsedArgv.align as string,
        size: parsedArgv.size as string,
      });
      break;
    case 'version':
      updateVersion();
      break;
    case 'commit':
      gitCommitMsg(parsedArgv.lang as string);
      break;
    case 'tree':
      tree(parsedArgv.dir as string, parsedArgv.deep as number, parsedArgv.ignore as Array<string>);
      break;
    case 'ls':
      winLs();
      break;
    case 'repo':
      repo();
      break;
  }
})();
