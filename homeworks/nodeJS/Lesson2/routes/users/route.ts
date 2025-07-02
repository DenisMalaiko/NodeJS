import * as usersService from '../../services/users.service.ts';

export default async function (req: any, res: any) {

  if (req.method === 'GET') {
    try {
      const users = await usersService.getUsers();
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(users));
    } catch (error: any) {

      if(error.status === 500) {
        res.statusCode = 500;
        res.end(JSON.stringify({
          error: 'Internal Server Error',
          status: 500
        }));
      }

      res.statusCode = 404;
      res.end(JSON.stringify({error: 'Not Found Users DB'}));
    }
  }

  else if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk: any) => body += chunk);
    req.on('end', async () => {
      try {
        const user = JSON.parse(body);
        await usersService.addUser(user);
        const users = await usersService.getUsers();

        if (!users) {
          res.statusCode = 404;
          res.end(JSON.stringify({error: 'Not Found Users DB'}));
        }

        res.end(JSON.stringify(users));
      } catch (error: any) {

        if(error.status === 500) {
          res.statusCode = 500;
          res.end(JSON.stringify({
            error: 'Internal Server Error',
            status: 500
          }));
        }

        res.statusCode = 400;
        res.end(JSON.stringify({error: 'Error On Adding User To DB'}));
      }
    });
  }

  else {
    res.writeHead(405);
    res.end('Method Not Allowed');
  }
}