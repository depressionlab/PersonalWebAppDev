import { app } from './server/main.ts';
import { HOSTNAME, PORT } from './server/utils/consts.ts';

if (import.meta.main) await app.listen({ hostname: HOSTNAME, port: PORT });
