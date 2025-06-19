import * as usersService from "../../../services/users.service.ts";

export default async function (req: any, res: any) {

  if (req.method === 'GET' && req.params.id) {
    try {
      const user = await usersService.getUser(req.params.id);

      if (!user) {
        res.statusCode = 404;
        res.end(JSON.stringify({
          status: 404,
          error: 'User Is Not Found In DB'
        }));
      }

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(user));
    } catch (error: any) {

      if(error.status === 500) {
        res.statusCode = 500;
        res.end(JSON.stringify({
          error: 'Internal Server Error',
          status: 500
        }));
      }

      res.statusCode = 404;
      res.end(JSON.stringify({error: 'User Is Not Found In DB'}));
    }
  }

  else if (req.method === 'PUT' && req.params.id) {
    let body = '';
    req.on('data', (chunk: any) => body += chunk);
    req.on('end', async () => {
      try {
        const user = JSON.parse(body);
        const updatedUser = await usersService.updateUser(req.params.id, user);

        if (!updatedUser) {
          res.statusCode = 404;
          res.end(JSON.stringify({
            status: 404,
            error: 'User Is Not Found In DB'
          }));
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(updatedUser));
      } catch (error: any) {

        if(error.status === 500) {
          res.statusCode = 500;
          res.end(JSON.stringify({
            error: 'Internal Server Error',
            status: 500
          }));
        }

        res.statusCode = 404;
        res.end(JSON.stringify({error: 'User Is Not Found In DB'}));
      }
    })
  }

  else if (req.method === 'DELETE' && req.params.id) {
    try {
      const response: any = await usersService.deleteUser(req.params.id)

      if (response.status !== 200) {
        res.statusCode = 404;
        res.end(JSON.stringify({
          status: 404,
          error: 'User Is Not Found In DB'
        }));
      }

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(response));
    } catch (error: any) {

      if(error.status === 500) {
        res.statusCode = 500;
        res.end(JSON.stringify({
          error: 'Internal Server Error',
          status: 500
        }));
      }

      res.statusCode = 404;
      res.end(JSON.stringify({error: 'User Is Not Found In DB'}));
    }
  }

  else if(!req.params.id) {
    res.statusCode = 400;
    res.end(JSON.stringify({error: 'Error On Adding User To DB'}));
  }

  else {
    res.writeHead(405);
    res.end('Method Not Allowed');
  }
}