import { bold, cyan, green } from '@std/fmt/colors';
import { MiddlewareObject, Next } from 'oak/middleware';
import { AppContext, AppState } from '../main.ts';

export class LoggerPlugin implements MiddlewareObject<AppState> {
	async handleRequest(context: AppContext, next: Next) {
		const responseTime = String(context.response.headers.get('X-Response-Time'));
		await next();
		console.log(`${green(context.request.method)} ${cyan(context.request.url.pathname)} - ${bold(responseTime)}`);
	}
}
