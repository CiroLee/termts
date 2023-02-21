/**
 * description: output the tree structure of the target path
 * author: CiroLee<https://github.com/CiroLee>
 */
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { isDirectory } from '../utils/file';
import { sumOfTargetInStr } from '../utils/utils';
const dirLabel = '├── ';
const levelLabel = '│   ';

interface TreeNodeProps {
  dir: string;
  level?: number;
  label?: string;
  ignore?: string[];
  cb: Function;
}

export const treeNode = async ({ dir, level = 1, label = '', cb, ignore = [] }: TreeNodeProps) => {
  try {
    let files = await readdir(dir);
    files = files.filter((f) => !['node_modules', '.git', ...ignore].includes(f));

    for (const file of files) {
      const childDir = resolve(resolve(dir, file));
      const noteStr = label + dirLabel + file;
      cb(noteStr);
      const isDir = await isDirectory(childDir);
      if (isDir && sumOfTargetInStr(noteStr, levelLabel) <= level - 2) {
        await treeNode({ dir: childDir, level, ignore, label: label + levelLabel, cb });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const tree = async (directory: string, level = 1, ignore?: string[]) => {
  const dir = directory ?? process.cwd();
  const list: string[] = [];
  let str: string = '';
  await treeNode({ dir, level, label: '', ignore, cb: (str: string) => list.push(str) });
  str = list.join('\n');
  console.log(str);
};
