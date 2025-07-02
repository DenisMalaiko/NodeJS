import http from "node:http";
import router from './lib/router.js';

const server = http.createServer((req: any, res) => {
  return router(req, res);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});


