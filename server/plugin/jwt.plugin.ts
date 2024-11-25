import type { Context } from 'oak/context';
import type { HttpMethod } from 'oak/commons/method';
import type { Middleware } from 'oak/middleware';
import { type Payload, verify } from 'djwt';
import type { RouterContext, RouterMiddleware } from 'oak/router';
import { Status } from 'oak/commons/status';

export type Algorithm = 'HS256' | 'HS384' | 'HS512' | 'PS256' | 'PS384' | 'PS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'none';
export type Pattern = { path: string | RegExp; methods?: HttpMethod[] };
export type IgnorePattern = string | RegExp | Pattern;
export type ErrorMessagesKeys = 'ERROR_INVALID_AUTH' | 'AUTHORIZATION_HEADER_NOT_PRESENT' | 'AUTHORIZATION_HEADER_INVALID';
export type ErrorMessages = Partial<Record<ErrorMessagesKeys, string>>;
export type OnSuccessHandler<R extends string = string> = (ctx: Context | RouterContext<R>, payload: Payload) => void;
export type OnFailureHandler<R extends string = string> = (ctx: Context | RouterContext<R>, error: Error) => boolean;

export interface JwtMiddlewareOptions {
	customMessages?: ErrorMessages;
	ignorePatterns?: Array<IgnorePattern>;
	onSuccess?: OnSuccessHandler;
	onFailure?: OnFailureHandler;
	key: CryptoKey | null;
	algorithm: Algorithm;
}

export class JWTMiddlewareError extends Error {
	override name = this.constructor.name;
}

const errorMessages: ErrorMessages = {
	ERROR_INVALID_AUTH: 'Authentication failed',
	AUTHORIZATION_HEADER_NOT_PRESENT: 'Authorization header is not present',
	AUTHORIZATION_HEADER_INVALID: 'Invalid Authorization header',
};

const ignorePath = <T extends Context | RouterContext<string>>(context: T, patterns: Array<IgnorePattern>): boolean => {
	const testString = (pattern: IgnorePattern) => typeof pattern === 'string' && pattern === context.request.url.pathname;
	const testRegExp = (pattern: IgnorePattern) => pattern instanceof RegExp && pattern.test(context.request.url.pathname);
	const testRecursive = (pattern: IgnorePattern) => typeof pattern === 'object' && 'path' in pattern && (testString(pattern.path) || testRegExp(pattern.path)) && (!pattern.methods || pattern.methods?.includes(context.request.method));
	const testPattern = (pattern: IgnorePattern) => testString(pattern) || testRegExp(pattern) || testRecursive(pattern);

	for (const pattern of patterns) if (testPattern(pattern)) return true;
	return false;
};

export const jwtMiddleware = <T extends RouterMiddleware<string> | Middleware = Middleware>({
	key,
	customMessages = {},
	ignorePatterns,
	onSuccess = () => {},
	onFailure = () => true,
}: JwtMiddlewareOptions): T => {
	Object.assign(customMessages, errorMessages);

	const core: RouterMiddleware<string> = async (context, next) => {
		const onUnauthorized = async (jwtValidation: Error, isJwtValidationError = false) => {
			const shouldThrow = onFailure(context, jwtValidation);
			if (shouldThrow) context.throw(Status.Unauthorized, isJwtValidationError ? jwtValidation.message : customMessages?.ERROR_INVALID_AUTH);
			await next();
		};

		if (ignorePatterns && ignorePath(context, ignorePatterns)) return await next();
		if (!context.request.headers.has('Authorization')) return await onUnauthorized(new JWTMiddlewareError(errorMessages.ERROR_INVALID_AUTH));
		const authHeader = context.request.headers.get('Authorization')!;
		if (!authHeader.startsWith('Bearer ') || authHeader.length <= 7) return await onUnauthorized(new JWTMiddlewareError(errorMessages.AUTHORIZATION_HEADER_INVALID));

		try {
			onSuccess(context, await verify(authHeader.slice(7), key));
		} catch (e) {
			await onUnauthorized(e as Error, true);
		}
		await next();
	};

	return core as T;
};

export default { jwtMiddleware };
