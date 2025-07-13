import { Injectable } from '@nestjs/common';

import * as path from 'path';
import * as fs from 'fs/promises';

import { unzip } from '../utils/unzip';
import { runWorkersForPhotos } from "../utils/runWorker";

@Injectable()
export class ZipService {
  async unzip(zipPath: string) {
    const t0 = performance.now();
    const ID = new Date().toISOString();
    const outputDir = path.join(process.cwd(), 'tmp', ID);
    await fs.mkdir(outputDir, { recursive: true });
    const photosUrls = await unzip(zipPath, outputDir);

    const state = await runWorkersForPhotos(
      path.resolve(__dirname, '../worker/thumbnail.js'),
      photosUrls,
      outputDir
    );

    console.log("ZIP PATH ", zipPath)

    await fs.rm(zipPath, { force: true });

    const durationMs = performance.now() - t0;

    return {
      ID,
      processed: state.processed,
      skipped: state.skipped,
      durationMs: Math.round(durationMs),
    };
  }
}