// ----- A. Zod-registry + upload.yaml ---------------------------------
import { registry } from '../openapi/registry.js';
import { OpenApiGeneratorV3} from '@asteasolutions/zod-to-openapi';

import YAML      from 'yaml';
import { readFileSync } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '../config/index.js';

const __dirname   = dirname(fileURLToPath(import.meta.url));

export const createZodSpec = () => {
  const zodSpec = new OpenApiGeneratorV3(registry.definitions).generateDocument({
    info: {
      title: config.appName,
      version: config.appVersion
    }
  });

  return zodSpec;
}
