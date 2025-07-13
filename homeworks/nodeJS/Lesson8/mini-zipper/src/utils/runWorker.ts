import { Worker } from 'worker_threads';
import { Mutex } from 'async-mutex';
import { SharedState } from '../interfaces/SharedState';

export async function runWorkersForPhotos(workerPath: string, imagePaths: string[], outputDir: string): Promise<SharedState> {
  const state: SharedState = { processed: 0, skipped: 0 };
  const mutex = new Mutex();

  const promises = imagePaths.map((imagePath) =>
    runWorker(workerPath, imagePath, outputDir, state, mutex),
  );

  await Promise.all(promises);
  return state;
}

async function runWorker(workerPath: string, imagePath: string, outputDir: string, state: SharedState, mutex: Mutex): Promise<void> {

  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: { path: imagePath, outputDir }
    });

    worker.once('message', async (result: 'processed' | 'skipped') => {
      const release = await mutex.acquire();

      try {
        state[result]++;
        resolve();
      } finally {
        release();
      }
    });

    worker.once('error', reject);

    worker.once('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
    });
  });
}