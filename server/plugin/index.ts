export * from './error.plugin.ts';
export * from './headers.plugin.ts';
export * from './logger.plugin.ts';

import { App } from '../app.types.ts';
import { ErrorPlugin } from './error.plugin.ts';
import { HeadersPlugin } from './headers.plugin.ts';
import { LoggerPlugin } from './logger.plugin.ts';
import { registerEvents } from './events.plugin.ts';
import { router } from '../app.router.ts';

export function registerPlugins(app: App): App {
    app.use(new ErrorPlugin());
    app.use(new HeadersPlugin());
    app.use(new LoggerPlugin());
    app.use(router.routes());
    app.use(router.allowedMethods());

    return registerEvents(app);
}
