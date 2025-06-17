import fs from 'fs';
import path from 'path';
import url from 'url';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routes: any = [];

async function loadRoutes(dir: any, base = '/') {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await loadRoutes(fullPath, path.join(base, file));
    } else if (file === 'route.ts') {
      const routePath = base.replace(/\\|\//g, '/');
      const module = await import(fullPathToFileUrl(fullPath));
      routes.push({ path: routePath, handler: module.default });
    }
  }
}

function fullPathToFileUrl(filePath: any) {
  const resolvedPath = path.resolve(filePath);
  const urlPath = resolvedPath.replace(/\\/g, '/');
  return url.pathToFileURL(urlPath).href;
}

function matchRoute(reqUrl: any) {
  const parsed = url.parse(reqUrl, true);
  const pathname: any = parsed.pathname;

  console.log("ROUTE LIST ", routes)
  console.log("PATHNAME ", pathname)

  for (const route of routes) {
    if (route.path.includes('[')) {
      const regex = new RegExp(`^${route.path.replace(/\[.*?\]/, '([^/]+)')}/?$`);
      const match = pathname.match(regex);
      if (match) {
        return { handler: route.handler, params: { id: match[1] } };
      }
    } else if (pathname === route.path || pathname === route.path + '/') {
      return { handler: route.handler, params: {} };
    }
  }

  return null;
}

await loadRoutes(path.join(__dirname, '../routes'));

export default async function router(req: any, res: any) {
  const matched = matchRoute(req.url);
  console.log("START ROUTER ", req.url, matched)


  if (matched) {
    req.params = matched.params;

    console.log("Matched params ", matched.params);

    console.log("REQUEST params ", req.params);

    await matched.handler(req, res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}