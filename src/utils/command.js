import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function runCommand(command, cwd) {
  return execPromise(command, {
    cwd,
    maxBuffer: 1024 * 1024 * 50, // Increase buffer to 50MB
    timeout: 300000, // 5 minute timeout
  });
}
