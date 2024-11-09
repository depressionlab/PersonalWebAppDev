import { MiddlewareObject, Next } from 'oak/middleware';
import { AppContext, AppState } from '../main.ts';

export class CookiePlugin implements MiddlewareObject<AppState> {
	async handleRequest(context: AppContext, next: Next) {
		const lastVisit = await context.cookies.get('lastVisit');
		await context.cookies.set('lastVisit', new Date().toISOString());
		if (lastVisit) {
			context.response.body = `Welcome. You were list here at ${lastVisit}.`;
		} else {
			context.response.body = `Welcome, I haven't seen you before.`;
		}

		await next();
	}
}
