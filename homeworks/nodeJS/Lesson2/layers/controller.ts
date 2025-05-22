import router from "../helpers/router.ts";
import { UserService } from "./service.ts";

router.addRoute("GET", "/users", (req: any, res: any) => {
  const data = UserService.getUsers();
  res.end(JSON.stringify(data))
});

router.addRoute("POST", "/addUser", async (req: any, res: any) => {
  let body = '';

  req.on('data', (chunk: any) => body += chunk);
  req.on('end', () => {
    try {
      const newUser = JSON.parse(body);
      const data = UserService.getUsers();
      UserService.addUser(newUser);

      res.end(JSON.stringify(data));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({error: 'Invalid request body'}));
    }
  });
});

router.addRoute("PUT", "/updateUser", async (req: any, res: any) => {
  let body = '';

  req.on('data', (chunk: any) => body += chunk);
  req.on('end', () => {
    try {
      const updateUser = JSON.parse(body);
      const result = UserService.updateUser(updateUser);

      if (!result) {
        res.statusCode = 404;
        res.end(JSON.stringify({error: 'User not found'}));
        return;
      }

      res.end(JSON.stringify(result));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({error: 'Invalid request body'}));
    }
  });
});

router.addRoute("DELETE", "/deleteUser", async (req: any, res: any, params: any) => {
  let id = params.id;

  req.on('data', (chunk: any) => id += chunk);
  req.on('end', () => {
    try {
      const result = UserService.deleteUser(id);

      if (!result) {
        res.statusCode = 404;
        res.end(JSON.stringify({error: 'User not found'}));
        return;
      }

      res.end(JSON.stringify(result));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({error: 'Invalid request body'}));
    }
  })
})