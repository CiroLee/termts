/**
 * description: special use ls in window.
 * author: CiroLee<https://github.com/CiroLee>
 */
import { readdir } from 'node:fs/promises';
import { isDirectory } from '../utils/file';
import chalk from 'chalk';
import { getBorderCharacters, table } from 'table';
const COLUMNS = 5;
export const winLs = async () => {
  try {
    const files = await readdir(process.cwd());
    const length = files.length;
    const fileArr: string[] = [];
    for (let i = 0; i < length; i++) {
      const name = files[i];
      const isDir = await isDirectory(name);
      if (isDir) {
        fileArr.push(chalk.blue(name));
      } else {
        fileArr.push(name);
      }
    }
    const tableData: string[][] = [];
    for (let i = 0; i < fileArr.length; i += COLUMNS) {
      const chunk = fileArr.slice(i, i + COLUMNS);
      if (chunk.length < COLUMNS) {
        chunk.push(...Array(COLUMNS - chunk.length).fill(''));
      }
      tableData.push(chunk);
    }
    const output = table(tableData, {
      border: getBorderCharacters('void'),
      drawHorizontalLine: () => false,
    });
    console.log(output);
  } catch (error) {
    console.error(error);
  }
};
