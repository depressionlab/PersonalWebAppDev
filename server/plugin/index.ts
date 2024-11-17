export * from './error.plugin.ts';
export * from './logger.plugin.ts';

import { App } from '../utils/types.ts';
import { ErrorPlugin } from './error.plugin.ts';
import { LoggerPlugin } from './logger.plugin.ts';
import { registerEvents } from './events.plugin.ts';
import { registerRouter } from '../routes/index.ts';

export function registerPlugins(app: App): App {
	const errorPlugin = new ErrorPlugin();
	const loggerPlugin = new LoggerPlugin();
	const routerPlugin = registerRouter();

	app.use(errorPlugin);
	app.use(loggerPlugin);
	app.use(routerPlugin.routes());
	app.use(routerPlugin.allowedMethods());

	return registerEvents(app);
}
