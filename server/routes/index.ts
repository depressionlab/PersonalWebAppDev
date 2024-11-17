import { Router } from 'oak/router';
import { AppRouter } from '../utils/types.ts';
import { db } from '../main.ts';

export function registerRouter(): AppRouter {
	const router: AppRouter = new Router();

	router.delete('/people/:id', (context) => {
		db.prepare('DELETE FROM people WHERE id = ?').run(context.params.id);
		context.response.body = { messsage: `person ${context.params.id} removed successfully`, status: 300 };
	});

	router.get('/people', (context) => {
		context.response.body = db.prepare('SELECT * FROM people').all();
	});

	router.post('/people', async (context) => {
		const { name, age } = await context.request.body.json();
		db.exec('INSERT INTO people (name, age) VALUES (?,?)', name, age);
		const lastInsertRowId = db.lastInsertRowId;
		context.response.status = 201;
		context.response.body = { id: lastInsertRowId, name, age };
	});

	router.put('/people/:id', async (context) => {
		const { name, age } = await context.request.body.json();
		db.prepare('UPDATE people SET name =?, age=? WHERE id = ?').run(name, age, context.params.id);
		context.response.body = { message: `person ${context.params.id} successfuly updated!`, status: 300 };
	});

	router.get('/', (context) => {
		context.response.body = 'hello world';
	});

	return router;
}
