import { join } from '@std/path';

const __dirname = new URL('.', import.meta.url).pathname;
const filePath = join(__dirname, './generated/client/index.d.ts');

try {
	const fileContent = await Deno.readTextFile(filePath);
	const updatedContent = fileContent.replace(new RegExp('./runtime/library.js', 'g'), './runtime/library.d.ts');
	await Deno.writeTextFile(filePath, updatedContent);
} catch (error) {
	if (error instanceof Error) {
		console.error(`error processing files: ${error.message}`);
	} else {
		console.error('unknown error occurred.');
	}
}
