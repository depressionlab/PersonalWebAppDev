import { bold, cyan, green, red, yellow } from '@std/fmt/colors';
import { format } from '@std/datetime/format';
import { USER_AGENT } from '../utils/consts.ts';
import { RouterMiddleware } from 'oak/router';
import { Middleware } from 'oak/middleware';

export const loggerMiddleware = <T extends RouterMiddleware<string> | Middleware = Middleware>(): T => {
	const core: RouterMiddleware<string> = async (context, next) => {
		await next();
		const userAgent = String(context.request.headers.get(USER_AGENT));
		const currentDate = format(new Date(Date.now()), 'MM-dd-yyyy hh:mm:ss.SSS');
		const logHeader = bold(`[${currentDate} Oak::logger]`);
		const logInfo = `${context.request.ip} "${context.request.method} ${context.request.url.pathname}"`;
		const logString = `${logHeader} ${logInfo} ${context.response.status} ${userAgent}`;

		if (context.response.status >= 500) {
			console.log(red(logString));
		} else if (context.response.status >= 400) {
			console.log(yellow(logString));
		} else if (context.response.status >= 300) {
			console.log(cyan(logString));
		} else if (context.response.status >= 200) {
			console.log(green(logString));
		} else {
			console.log(red(logString));
		}
	};

	return core as T;
};

export default { loggerMiddleware };
