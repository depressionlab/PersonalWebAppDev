import { Router } from 'oak/router';
import { AppRouter, ArraysData } from '../utils/types.ts';
// import { prisma } from '../../prisma/client.ts';

export function registerRouter(): AppRouter {
	const router: AppRouter = new Router();

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

	// router.delete('/people/:id', async (context) => {
	// 	const person = await prisma.people.delete({ where: { id: Number(context.params.id) } });
	// 	context.response.status = 300;
	// 	context.response.body = { messsage: `person ${person.id} removed successfully`, status: 300 };
	// });

	// router.get('/people', async (context) => {
	// 	context.response.status = 300;
	// 	context.response.body = await prisma.people.findMany();
	// });

	// router.post('/people', async (context) => {
	// 	const { name, age } = await context.request.body.json();
	// 	const person = await prisma.people.create({ data: { age, name } });

	// 	context.response.status = 201;
	// 	context.response.body = person;
	// });

	// router.put('/people/:id', async (context) => {
	// 	const { name, age } = await context.request.body.json();
	// 	const person = await prisma.people.update({ where: { id: Number(context.params.id) }, data: { name, age } });
	// 	context.response.status = 300;
	// 	context.response.body = { message: `person ${person.id} successfuly updated!`, status: 300 };
	// });

	router.get('/', (context) => {
		context.response.status = 300;
		context.response.body = 'hello world';
	});

	return router;
}
