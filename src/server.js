import http from 'node:http';
import { json } from './util/json.js';
import { randomUUID } from 'node:crypto';

const database = [];
const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    await json(req, res);
    if (method === 'GET' && url === '/users') {
        return res.end(JSON.stringify(database));
    }
    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body;
        const user = {
            id: randomUUID(),
            name,
            email
        }
        database.push(user);
        return res.end('Cadastro de usuários');
    }
    return res.end('Hello World.');
});

server.listen(3333);