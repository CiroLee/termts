/**
 * description: special use ls in window.
 * author: CiroLee<https://github.com/CiroLee>
 */
import { readdir } from 'node:fs/promises';
import { isDirectory } from '../utils/file';
import chalk from 'chalk';
import { getBorderCharacters, table } from 'table';
const COLUMNS = 5;

const coloredFiles = async (files: string[]): Promise<string[]> => {
  const length = files.length;
  const fileArr: string[] = [];
  for (let i = 0; i < length; i++) {
    const name = files[i];
    const isDir = await isDirectory(name);
    if (isDir) {
      fileArr.push(chalk.magentaBright(name));
    } else {
      fileArr.push(name);
    }
  }
  return fileArr;
};
const outputTable = async (files: string[]) => {
  const fileArr: string[] = await coloredFiles(files);
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
};

const outputBlock = async (files: string[]) => {
  const blocks: string[] = await coloredFiles(files);
  const str = blocks.join('\n');
  console.log(str);
};
export const winLs = async () => {
  try {
    const cols = process.stdout.columns;
    const files = await readdir(process.cwd());
    if (files.some((file) => file.length > cols / 2)) {
      outputBlock(files);
    } else {
      outputTable(files);
    }
  } catch (error) {
    console.error(error);
  }
};
