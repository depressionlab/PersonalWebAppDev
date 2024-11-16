import { router } from '../app.router.ts';
import { db } from '../main.ts';

router.get('/people', (context) => {
    context.response.body = db.prepare('SELECT * FROM people').all();
});
