import { RequestHandler } from "../types/RequestHandler";
import { RouterMap } from "../interfaces/RouterMap";

const router: RouterMap = {};

const addRoute = (method: string, path: string, handler: RequestHandler) => {
  const key = `${method.toUpperCase()} ${path}`;
  router[key] = handler;
};

const handleRoute = (req: any, res: any) => {
  const key = `${req.method.toUpperCase()} ${req.url}`;
  const handler = router[key];

  if (handler) {
    handler(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
}

export default {
  addRoute,
  handleRoute
}



