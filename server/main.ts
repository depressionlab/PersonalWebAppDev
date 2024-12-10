import { errorMiddleware, eventMiddleware, loggerMiddleware } from './plugin/index.ts';
import { App, AppState } from './utils/types.ts';
import { registerRouter } from './routes/index.ts';
// import { create, getNumericDate } from 'djwt';
import { Application } from 'oak/application';

const init: App = new Application<AppState>();
// export const key = await crypto.subtle.generateKey({ name: 'HMAC', hash: 'SHA-512' }, true, ['sign', 'verify']);
// export const createJWT = (expirationDate?: Date) => create({ alg: 'HS512', type: 'JWT' }, { exp: getNumericDate(expirationDate || 60 * 60) }, key);
export const router = registerRouter();

init.use(errorMiddleware());
init.use(loggerMiddleware());
// init.use(jwtMiddleware({ algorithm: 'HS512', key }));
init.use(router.routes());
init.use(router.allowedMethods());

export const app = eventMiddleware(init);
