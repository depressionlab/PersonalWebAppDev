import { X_RESPONSE_TIME } from '../app.consts.ts';
import { AppContext, AppMiddleware, Next } from '../app.types.ts';

export class HeadersPlugin implements AppMiddleware {
	async handleRequest(context: AppContext, next: Next) {
		const start = Date.now();
		await next();
		const ms = Date.now() - start;
		context.response.headers.set(X_RESPONSE_TIME, `${ms}ms`);
	}
}
