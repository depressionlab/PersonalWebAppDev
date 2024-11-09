import { HttpError, Status } from 'oak';
import { MiddlewareObject, Next } from 'oak/middleware';
import { AppContext, AppState } from '../main.ts';
import { bold, red } from '@std/fmt/colors';

export class ErrorPlugin implements MiddlewareObject<AppState> {
	async handleRequest(context: AppContext, next: Next) {
		try {
			await next();
		} catch (e) {
			if (e instanceof HttpError) {
				context.response.status = e.status;
				context.response.body = `<!DOCTYPE html>
				<html>
					<body>
						<h1>${e.status} - ${e.expose ? e.message : Status[e.status]}</h1>
					</body>
				</html>`;
			} else if (e instanceof Error) {
				context.response.status = 500;
				context.response.body = `<!DOCTYPE html>
				<html>
					<body>
						<h1>500 - Internal Server Error</h1>
					</body>
				</html>`;
				console.log('unhandeled error:', red(bold(e.message)));
				console.log(e.stack);
			}
		}
	}
}
