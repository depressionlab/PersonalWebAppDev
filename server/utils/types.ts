import { MiddlewareObject } from 'oak/middleware';
import { Context } from 'oak/context';
import { Application } from 'oak/application';
import { Router } from 'oak/router';

export type { Next } from 'oak/middleware';
export interface AppState {
	responseTime: number;
}

export type AppContext = Context<AppState>;
export type AppMiddleware = MiddlewareObject<AppState>;
export type App = Application<AppState>;
export type AppRouter = Router<AppState>;

export type ArraysData = { array: number[] };
