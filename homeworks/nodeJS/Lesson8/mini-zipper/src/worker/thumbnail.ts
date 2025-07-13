import sharp from 'sharp';
import { basename, join, parse } from 'path';
import { workerData, parentPort } from 'worker_threads';
import { existsSync, mkdirSync } from 'fs';

async function run() {
  const outputDir = workerData.outputDir;
  if (!existsSync(outputDir)) mkdirSync(outputDir, {recursive: true});

  const parsed = parse(workerData.path);
  const newFileName = `${parsed.name}_thumb${parsed.ext}`; // приклад: photo.jpg -> photo_thumb.jpg
  const outputPath = join(outputDir, newFileName);

  try {
    await sharp(workerData.path).resize(150).toFile(outputPath);
    parentPort?.postMessage('processed');
  } catch {
    parentPort?.postMessage('skipped');
  }
}

run();