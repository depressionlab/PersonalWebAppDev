import { router } from '../app.router.ts';
import { db } from '../main.ts';

router.delete('/people/:id', (context) => {
    db.prepare('DELETE FROM people WHERE id = ?').run(context.params.id);
    context.response.body = { messsage: `person ${context.params.id} removed successfully`, status: 300 };
});
