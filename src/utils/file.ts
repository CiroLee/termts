import fsPromise from 'node:fs/promises';

export const fileExist = async (filepath: string): Promise<boolean> => {
  try {
    await fsPromise.access(filepath, fsPromise.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

export const isDirectory = async (dir: string): Promise<boolean> => {
  try {
    const stat = await fsPromise.lstat(dir);
    return stat.isDirectory();
  } catch (error) {
    return false;
  }
};
