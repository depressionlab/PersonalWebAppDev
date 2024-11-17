import { registerPlugins } from './plugin/index.ts';
import { registerDatabase } from './data/index.ts';
import { registerApp } from './plugin/core.plugin.ts';
import { HOSTNAME, PORT } from './utils/consts.ts';

export const db = registerDatabase();
export const app = registerPlugins(registerApp());

await app.listen({ hostname: HOSTNAME, port: PORT });
