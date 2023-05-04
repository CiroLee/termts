/**
 * description: simply to open the repository use your default browser
 * author: CiroLee<https://github.com/CiroLee>
 */
import ChildProcess from '../utils/child-process';
import open from 'open';

export async function repo() {
  try {
    const { stdout } = await ChildProcess.exec('git config --get remote.origin.url');
    if (stdout) {
      const repoUrl = stdout
        .toString()
        .trim()
        .replace(/\.git$/, '');
      open(repoUrl);
    } else {
      throw new Error('current project is not a git repository');
    }
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}
