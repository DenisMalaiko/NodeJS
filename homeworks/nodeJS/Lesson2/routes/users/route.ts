/*
import { getAllUsers, createUser } from '../../services/users.service.js';
*/

export default async function (req: any, res: any) {
  console.log("START GET USERS ")

  if (req.method === 'GET') {
    //const users = await getAllUsers();
    const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));

  }
/*  else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      const data = JSON.parse(body);
      const user = await createUser(data);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    });
  }*/
  else {
    res.writeHead(405);
    res.end('Method Not Allowed');
  }
}