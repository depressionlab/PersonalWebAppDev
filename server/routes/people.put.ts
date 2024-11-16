import { router } from '../app.router.ts';
import { db } from '../main.ts';

router.put('/people/:id', async (context) => {
    const { name, age } = await context.request.body.json();
    db.prepare('UPDATE people SET name =?, age=? WHERE id = ?').run(name, age, context.params.id);
    context.response.body = { message: `person ${context.params.id} successfuly updated!`, status: 300 };
});
