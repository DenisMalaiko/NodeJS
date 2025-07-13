import AdmZip from 'adm-zip';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function unzip(path: string, outputDir: string) {
  const zip = new AdmZip(path);
  zip.extractAllTo(outputDir, true);
  return await getPhotos(outputDir);
}

async function getPhotos(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.name === '__MACOSX') {
        return null;
      } else if (entry.isDirectory()) {
        console.log("IS DIRECTORY ", entry.name)
        return await getPhotos(fullPath);
      } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
        return fullPath;
      } else {
        return null;
      }
    })
  );

  const flatFiles = files.flat().filter(Boolean) as string[];

  return flatFiles;
}