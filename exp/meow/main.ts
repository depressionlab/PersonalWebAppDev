import { bold, green, yellow } from '@std/fmt/colors';
import { Application } from 'oak/application';
import { ErrorPlugin } from './plugin/error.plugin.ts';
import { LoggerPlugin } from './plugin/logger.plugin.ts';
import { HeadersPlugin } from './plugin/headers.plugin.ts';
import { KeyStack } from 'oak/commons/keystack';
import { CookiePlugin } from './plugin/cookie.plugin.ts';
import { Context } from 'oak/context';

export interface AppState { responseTime: number }
export type AppContext = Context<AppState>;
const keyStack = new KeyStack([':33333eewewewew', 'meoweweew', 'eqwjejsdjfsgjfs']);
const defaultAppState: AppState = { responseTime: Date.now() };
const app = new Application<AppState>({
	state: defaultAppState,
	contextState: 'clone',
	logErrors: true,
	keys: keyStack,
});

app.use(new ErrorPlugin());
app.use(new HeadersPlugin());
app.use(new LoggerPlugin());
app.use(new CookiePlugin());
app.addEventListener('listen', e => {
	console.log(`${bold('started listening on')} ${yellow(`${e.hostname}:${e.port}`)}`);
	console.log(bold(`   using HTTP server: ${yellow(e.serverType)}`));
});

await app.listen({ hostname: '127.0.0.1', port: 8000 });
console.log(green(bold('finished')));
