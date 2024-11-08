import { MiddlewareObject, Next } from 'oak/middleware';
import { AppContext, AppState } from '../main.ts';

export class HeadersPlugin implements MiddlewareObject<AppState> {
	async handleRequest(context: AppContext, next: Next) {
		const start = Date.now();
		await next();
		const ms = Date.now() - start;
		context.response.headers.set('X-Response-Time', `${ms}ms`);
	};
};
