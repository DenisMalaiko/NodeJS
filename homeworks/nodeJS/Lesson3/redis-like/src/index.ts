import http from "node:http";
const store = new Map();

function response(json: any, res: any) { res.end(JSON.stringify(json)); }

http.createServer(async (req: any, res) => {
  const url = new URL(req.url, 'http://localhost:3000');

  if(req.method === 'GET' && url.pathname === '/get') {
    return response({ value: store.get(url.searchParams.get('key')) ?? null }, res);
  }

  if (req.method === 'POST' && url.pathname === '/set') {
    let body = '';
    req.on('data', (c: any) => (body += c));
    req.on('end', () => {
      const { key, value } = JSON.parse(body);
      store.set(key, value);
      response({ ok: true }, res);
    });
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
}).listen(4000, () => console.log("Server is running on port 4000"));