import http from "node:http";
import router from "./helpers/router.ts";
import "./layers/controller.ts"

const server = http.createServer((req, res) => {
  router.handleRoute(req, res);
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log("Server is running on port 8080");
});


