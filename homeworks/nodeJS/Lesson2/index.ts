import http from "node:http";
import router from './lib/router.js';

const server = http.createServer((req: any, res) => {
  const [ , resource, id ] = req.url.split('/');
  if (resource === 'users') {
    return router(req, res);
  }

  res.writeHead(404).end('Not found!!!');
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});


