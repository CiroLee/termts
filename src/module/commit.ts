import inquirer from 'inquirer';
import chalk from 'chalk';
import ChildProcess from '../utils/child-process';
const gray = chalk.gray;
const commitPromt = (lang: 'zh' | 'en') => {
  return [
    {
      type: 'list',
      message: 'select a commit message type',
      name: 'commitType',
      choices: [
        `feat: ${lang === 'en' ? gray('(new feature)') : gray('(新增feature)')}`,
        `fix: ${lang === 'en' ? gray('(fix bugs)') : gray('(修复bug)')}`,
        `style: ${
          lang === 'en'
            ? gray('(Only the indentation and space styles have been changed, not the code logic)')
            : gray('(仅修改了缩进、空格等样式, 不改变代码逻辑)')
        }`,
        `refactor: ${
          lang === 'en'
            ? gray('(Code refactoring, no new features or bug fixes)')
            : gray('(代码重构, 没有加新功能或者修复 bug)')
        }`,
        `chore: ${
          lang === 'en'
            ? gray('(Change the build process, or add dependencies, tools, etc)')
            : gray('(改变构建流程、或者增加依赖库、工具等)')
        }`,
        `docs: ${
          lang === 'en'
            ? gray('(Modification of documents only, e.g. README, CHANGELOG, CONTRIBUTE, etc)')
            : gray('(仅修改文档, 如README, CHANGELOG, CONTRIBUTE等)')
        }`,
        `perf: ${
          lang === 'en'
            ? gray('(Optimisation related, e.g. to improve performance, experience)')
            : gray('(优化相关, 比如提升性能、体验)')
        }`,
        `test: ${
          lang === 'en'
            ? gray('(Test cases, including unit tests, integration tests, etc)')
            : gray('(测试用例, 包括单元测试、集成测试等)')
        }`,
        `revert: ${lang === 'en' ? gray('(Roll back to the previous version)') : gray('(回滚到上一个版本)')}`,
      ],
      filter(val: string) {
        return val.split(':')[0];
      },
    },
  ];
};

export const gitCommitMsg = async (language?: string) => {
  const lang = language !== 'en' ? 'zh' : language;
  try {
    const { stdout } = await ChildProcess.exec('(git version)');
    if (stdout) {
      const { commitType } = await inquirer.prompt(commitPromt(lang));
      const { message } = await inquirer.prompt([
        {
          type: 'input',
          name: 'message',
          message: 'input commit message:',
        },
      ]);
      if (!message) {
        throw new Error('commit message can not be empty');
      }
      await ChildProcess.exec(`git commit -m "${commitType}: ${message}"`);
      console.log(chalk.green('Done 🎉'));
    }
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};
