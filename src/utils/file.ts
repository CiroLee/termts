import fsPromise from 'node:fs/promises';

export const fileExist = async (filepath: string): Promise<boolean> => {
  try {
    await fsPromise.access(filepath, fsPromise.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};
