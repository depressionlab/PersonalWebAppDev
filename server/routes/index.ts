import { Router } from 'oak/router';
import { AppRouter, ArraysData } from '../utils/types.ts';
import { Database } from '@db/sqlite';
// import { prisma } from '../../prisma/client.ts';

export function registerRouter(): AppRouter {
	const router: AppRouter = new Router();
	const db = new Database('dev.db');
	db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, age INTEGER NOT NULL)');

	router.get('/users', (context) => {
		const users = db.prepare('SELECT * from users').all();
		context.response.body = users;
	});

	router.post('/users', async (context) => {
		const { name, age } = await context.request.body.json();
		db.exec('INSERT INTO users (name, age) VALUES (?,?)', name, age);
		const id = db.lastInsertRowId;
		context.response.body = { id, name, age };
	});

	router.get('/users/:id', (context) => {
		const user = db.prepare('SELECT * FROM users WHERE id = ?').get(context.params.id);
		context.response.body = user;
	});

	router.put('/users/:id', async (context) => {
		const { name, age } = await context.request.body.json();
		db.prepare('UPDATE users SET name=?, age=? WHERE id = ?').run(name, age, context.params.id);
		context.response.body = { message: 'user updated successfully' };
	});

	router.delete('/users/:id', (context) => {
		db.prepare('DELETE FROM users WHERE id = ?').run(context.params.id);
		context.response.body = { message: 'user deleted successfully' };
	});

	router.get('/ping', (context) => {
		context.response.body = 'pong';
	});

	router.get('/add', async (context) => {
		const data: ArraysData = await context.request.body.json();
		context.response.body = data.array.reduce((a, b) => a + b, 0);
	});

	router.get('/product', async (context) => {
		const data: ArraysData = await context.request.body.json();
		context.response.body = data.array.reduce((a, b) => a * b, 0);
	});

	router.get('/evens', async (context) => {
		const data: ArraysData = await context.request.body.json();
		context.response.body = data.array.filter((a) => a % 2 === 0);
	});

	router.get('/max', async (context) => {
		const data: ArraysData = await context.request.body.json();
		context.response.body = Math.max(...data.array);
	});

	router.get('/min', async (context) => {
		const data: ArraysData = await context.request.body.json();
		context.response.body = Math.min(...data.array);
	});

	router.get('/sort/:ascending', async (context) => {
		const data: ArraysData = await context.request.body.json();
		const ascending = Boolean(context.params.ascending);
		const sorted = data.array.sort((a, b) => a - b);
		context.response.body = ascending ? sorted : sorted.reverse();
	});

	router.get('/target/:target', async (context) => {
		const data: ArraysData = await context.request.body.json();
		const target = Number(context.params.target);
		for (let i = 0; i < data.array.length; i++) {
			if (data.array.indexOf(target - data.array[i]) !== -1) {
				context.response.body = true;
			}
		}

		if (!context.response.body) {
			context.response.body = false;
		}
	});

	router.get('/', (context) => {
		context.response.status = 300;
		context.response.body = 'hello world';
	});

	return router;
}
