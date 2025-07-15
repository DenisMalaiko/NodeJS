import { listUsers, createUser } from '../../services/users.service.js';

export const GET = async(req: any, res: any) => {
  const users = await listUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const  POST = async(req: any, res: any) => {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }
  let userData;
  try {
    userData = JSON.parse(body);
  } catch (error) {
    console.error(error);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON' }));
    return;
  }

  if (!userData.name || typeof userData.name !== 'string') {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Name is required' }));
    return;
  }

  const newUser = await createUser(userData);
  res.writeHead(201, {
    'Content-Type': 'application/json',
    'Location': `/users/${newUser.id}`
  });
  res.end(JSON.stringify(newUser));
};