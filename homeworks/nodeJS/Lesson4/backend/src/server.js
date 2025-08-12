import http from 'node:http';
import { createApp } from './app.js';
import { config } from './config/index.js';
import { container } from './container.js';

const app = createApp();
const server = http.createServer(app);

server.listen(config.port, () =>
    console.log(`🚀 ${config.env} API ready on http://localhost:${config.port}`)
);

async function shutDown() {
  console.log('🔄  Shutting down gracefully...');

  try {
    await container.dispose();
    console.log('🗑️  Container disposed');

    server.close(() => {
      console.log('✅  Closed out remaining connections');
      process.exit(0);
    });

    setTimeout(() => process.exit(1), 10_000).unref();

  } catch (err) {
    console.error('❌ Error during shutdown', err);
    process.exit(1);
  }
}

process.on('SIGTERM', shutDown);
process.on('SIGINT',  shutDown);