import { bold, yellow } from '@std/fmt/colors';
import { App } from '../app.types.ts';

export function registerEvents(app: App): App {
    app.addEventListener('listen', (e) => {
        console.log(`${bold('started listening on')} ${yellow(`${e.hostname}:${e.port}`)}`);
        console.log(bold(`   using HTTP server: ${yellow(e.serverType)}`));
    });

    return app;
}
