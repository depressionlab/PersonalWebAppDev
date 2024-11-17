import { KeyStack } from 'oak/commons/keystack';
import { Application } from 'oak/application';
import { App } from '../utils/types.ts';

export function registerApp(): App {
	const keyStack: KeyStack = new KeyStack([':33333eewewewew', 'meoweweew', 'eqwjejsdjfsgjfs']);
	const app: App = new Application({ keys: keyStack });

	return app;
}
