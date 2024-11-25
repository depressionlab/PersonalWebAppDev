import { Status } from 'oak/commons/status';
import { HttpError } from 'oak/commons/http_errors';
import { bold, red } from '@std/fmt/colors';
import { RouterMiddleware } from 'oak/router';
import { Middleware } from 'oak/middleware';

export const errorMiddleware = <T extends RouterMiddleware<string> | Middleware = Middleware>(): T => {
	const core: RouterMiddleware<string> = async (context, next) => {
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
	};

	return core as T;
};

export default { errorMiddleware };
