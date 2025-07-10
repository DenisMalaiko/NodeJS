import { Injectable } from '@nestjs/common';

@Injectable()
export class ZipService {
  async unzip(zipPath: string) {
    console.log("-------");
    console.log("ZIP PATH: ", zipPath);
    console.log("-------");

    const t0 = performance.now();
  }
}