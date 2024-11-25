import { addN, every, flat, funcPrepend, funcPrepend2, lettergrade, toLowercase } from './js-types.ts';

const addedN = addN(2)(3); // 5
const lowercaseMeow = toLowercase('MeOw'); // no error, type inspection is as expected (`'meow'`)
const prepended = funcPrepend('hello')('world'); // no error, type inspection is as expected (`'hello world'`)
const prepostpended = funcPrepend2('hello')('goodbye!')('foo'); // no error, type inspection is as expected (`'hello foo goodbye!'`)
const lettergraded = lettergrade([95, 72, 88, 55, 78, 92]);
const flattened = flat([[1, 2, [3, 4]], [5, [6, 7, [34]]], 8] as const, 2);

if (import.meta.main) {
	console.log('addN', addedN);
	console.log('toLowercase', lowercaseMeow);
	console.log('funcPrepend', prepended);
	console.log('funcPrepend2', prepostpended);
	console.log('lettergrade', lettergraded);
	console.log('flat', flattened);
	console.log('everies:\n');
	console.log(every([1, 3, 5], (n) => n < 10));
	console.log(every([2, 4, 16], (n) => n < 10));
	console.log(every([], (n) => n < 10));
}
