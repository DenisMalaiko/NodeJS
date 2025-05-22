import { RouterMap } from "../interfaces/RouterMap";

const router: RouterMap = {};

const addRoute = (method: string, path: string, handler: any) => {
  const key = `${method.toUpperCase()} ${path}`;
  router[key] = handler;
};

const handleRoute = (req: any, res: any) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const key = `${req.method.toUpperCase()} ${url.pathname}`;
  const handler = router[key];
  const params = Object.fromEntries(url.searchParams);

  if (handler) {
    handler(req, res, params);
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



