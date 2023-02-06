import { spawn, exec, SpawnOptionsWithoutStdio, ExecOptions } from 'node:child_process';

interface ChildProcessRes {
  error?: ExecOptions | Error | null;
  stdout?: string | Buffer;
  stderr?: string | Buffer;
}

const cwd = process.cwd();
export default class ChildProcess {
  static spawn(cmd: string, options?: SpawnOptionsWithoutStdio): Promise<string | Error> {
    const child = spawn(cmd, {
      cwd,
      shell: true,
      stdio: ['inherit', 'pipe', 'inherit'],
      ...options,
    });

    return new Promise((resolve, reject) => {
      let result = '';
      child.stdout?.on('data', (data: Buffer | string) => {
        result += data.toString();
      });
      child.on('close', () => {
        resolve(result);
      });
      child.on('error', (error) => {
        reject(error);
      });
    });
  }
  static exec(cmd: string, options?: ExecOptions): Promise<ChildProcessRes> {
    return new Promise((resolve, reject) => {
      exec(cmd, options, (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        resolve({ stdout });
      });
    });
  }
}
