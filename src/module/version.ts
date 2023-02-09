/**
 * description: update version field of package interactively in the current directory
 * author: CiroLee<https://github.com/CiroLee>
 */
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import { fileExist } from '../utils/file';
const cwd = process.cwd;

const writeVersion = async (newVersion: string) => {
  try {
    const filepath = `${cwd()}/package.json`;
    const pkg = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    pkg.version = newVersion;
    fs.writeFileSync(filepath, JSON.stringify(pkg, null, 2), 'utf-8');
    console.log(chalk.green('Done 🎉'));
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};
const inputVersion = async (oldVersion: string) => {
  try {
    const { version } = await inquirer.prompt([
      {
        type: 'input',
        message: 'please input a new version',
        name: 'version',
      },
    ]);
    if (version === oldVersion) {
      throw new Error('you can not set the same version as last time');
    }
    writeVersion(version);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

export const updateVersion = async () => {
  try {
    const currentPkgFile = `${cwd()}/package.json`;
    if (await fileExist(currentPkgFile)) {
      throw new Error('package does not exist');
    }
    const pkg = JSON.parse(fs.readFileSync(currentPkgFile, 'utf-8'));
    const [major, minor, patch] = pkg.version.split('.');
    const answer: { version: string } = await inquirer.prompt([
      {
        type: 'list',
        message: `select version(current: ${pkg.version})`,
        name: 'version',
        choices: [
          `${major}.${minor}.${Number(patch) + 1}`,
          `${major}.${Number(minor) + 1}.0`,
          `${Number(major) + 1}.0.0`,
          new inquirer.Separator('--- Or choose custom modification---'),
          'manual',
        ],
      },
    ]);
    if (answer.version === 'manual') {
      inputVersion(pkg.version);
    } else {
      writeVersion(answer.version);
    }
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};
