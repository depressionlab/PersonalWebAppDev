import { router } from '../app.router.ts';
import { db } from '../main.ts';

router.post('/people', async (context) => {
    const { name, age } = await context.request.body.json();
    db.exec('INSERT INTO people (name, age) VALUES (?,?)', name, age);
    const lastInsertRowId = db.lastInsertRowId;
    context.response.status = 201;
    context.response.body = { id: lastInsertRowId, name, age };
});
