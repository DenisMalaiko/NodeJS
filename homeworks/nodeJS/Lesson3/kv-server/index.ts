import http from "node:http";

const server = http.createServer((req: any, res) => {
  res.end("KV Server");
});

server.listen(4000, () => {
  console.log("Server is running on port 3000");
});