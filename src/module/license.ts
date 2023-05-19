/**
 * description: generate license.
 * author: CiroLee<https://github.com/CiroLee>
 */
import got from 'got';
import ora from 'ora';
import inquirer from 'inquirer';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import chalk from 'chalk';

interface LicensesRes {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

const spinner = ora();
const noNeedSignatures = [
  'agpl-3.0',
  'apache-2.0',
  'bsl-1.0',
  'cc0-1.0',
  'epl-2.0',
  'gpl-2.0',
  'gpl-3.0',
  'lgpl-2.1',
  'mpl-2.0',
  'unlicense',
];

export const generateLicense = async () => {
  try {
    spinner.start('loading...');
    const data = await got.get('https://api.github.com/licenses').json<LicensesRes[]>();
    spinner.stop();
    const { url } = await inquirer.prompt([
      {
        type: 'list',
        message: 'select a license',
        name: 'url',
        choices: data.map((item) => ({
          name: item.spdx_id,
          value: item.url,
        })),
      },
    ]);
    spinner.start('waiting...');
    const licenseFile = await got.get(url).json<{ body: string }>();
    spinner.stop();
    const segments = url.split('/');
    if (noNeedSignatures.includes(segments[segments.length - 1])) {
      fs.writeFileSync(path.join(cwd(), 'LICENSE'), licenseFile.body);
    } else {
      const { name, year } = await inquirer.prompt([
        {
          type: 'input',
          message: 'input your name(required)',
          name: 'name',
          validate: (name: string) => {
            return name !== '';
          },
        },
        {
          type: 'input',
          message: 'input the year(required)',
          name: 'year',
          validate: (year: string) => {
            return year !== '';
          },
        },
      ]);
      const file = licenseFile.body.replace(/\\n/g, `${os.EOL}`).replace('[year]', year).replace('[fullname]', name);
      fs.writeFileSync(path.join(cwd(), 'LICENSE'), file);
    }
    console.log(chalk.green('Done 🎉'));
  } catch (error) {
    console.error(error);
  }
};
