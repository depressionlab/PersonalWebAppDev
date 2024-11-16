import { bold, cyan, green, red, yellow } from '@std/fmt/colors';
import { format } from '@std/datetime/format';
import { AppContext, AppMiddleware, Next } from '../app.types.ts';
import { USER_AGENT, X_RESPONSE_TIME } from '../app.consts.ts';

export class LoggerPlugin implements AppMiddleware {
	async handleRequest(context: AppContext, next: Next) {
		await next();
		const responseTime = String(context.response.headers.get(X_RESPONSE_TIME));
		const userAgent = String(context.request.headers.get(USER_AGENT));
		const currentDate = format(new Date(Date.now()), 'MM-dd-yyyy hh:mm:ss.SSS');
		const logHeader = bold(`[${currentDate} Oak::logger]`);
		const logInfo = `${context.request.ip} "${context.request.method} ${context.request.url.pathname}"`;
		const logString = `${logHeader} ${logInfo} ${context.response.status} ${userAgent} ${responseTime}`;
		
		if (context.response.status >= 500)
			console.log(red(logString));
		else if (context.response.status >= 400)
			console.log(yellow(logString));
		else if (context.response.status >= 300)
			console.log(cyan(logString));
		else if (context.response.status >= 200)
			console.log(green(logString));
		else
			console.log(red(logString));
	}
}
