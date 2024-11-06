// First Class Functions: 1. This prints out the number 6.
const addN: (n: number) => (x: number) => number = (n) => (x) => x + n;
const expected = addN(2)(3); // 5

// Exercises
// 1
const toLowercase = <S extends string>(s: S) => s.toLocaleLowerCase() as Lowercase<S>;
const lowercaseMeow = toLowercase('MeOw'); // no error, type inspection is as expected (`'meow'`)

// 2
type FuncPrepend = <Prefix extends string>(prefix: Prefix) => <String extends string>(s: String) => `${Prefix & string} ${String & string}`;
const funcPrepend: FuncPrepend = (prefix) => (s) => `${prefix} ${s}`;
const prepended = funcPrepend('hello')('world'); // no error, type inspection is as expected (`'hello world'`)

// 3
type FuncPrepend2 = <Prefix extends string>(prefix: Prefix) => <Postfix extends string>(postfix: Postfix) => <String extends string>(s: String) => `${Prefix & string} ${String & string} ${Postfix & string}`;
const funcPrepend2: FuncPrepend2 = (prefix) => (postfix) => (s) => `${prefix} ${s} ${postfix}`;
const prepended2 = funcPrepend2('hello')('goodbye!')('foo'); // no error, type inspection is as expected (`'hello foo goodbye!'`)

// 4
type GradeRange = 'A' | 'B' | 'C' | 'D' | 'F';
function lettergrade<Scores extends readonly number[]>(scores: Scores): GradeRange[] {
	return scores.map((score) => {
		if (score >= 89.5) return 'A';
		if (score >= 79.5) return 'B';
		if (score >= 69.5) return 'C';
		if (score >= 59.5) return 'D';
		return 'F';
	});
}

const lettergraded = lettergrade([95, 72, 88, 55, 78, 92]);

// 5
function flat<Arrays, Depth extends number = 1>(
	arrays: Arrays,
	depth?: Depth,
): FlatArray<Arrays, Depth>[] {
	return <FlatArray<Arrays, Depth>[]> Array.prototype.flat.apply(arrays, [
		depth,
	]);
}

const flattened = flat([[1, 2, [3, 4]], [5, [6, 7, [34]]], 8] as const, 2);

// 6
function every<T>(array: Array<T>, test: (value: T) => unknown): boolean {
	for (let i = 0; i < array.length; i++) {
		if (!test(array[i])) {
			return false;
		}
	}

	return true;
}

if (import.meta.main) {
	console.log('addN', expected);
	console.log('toLowercase', lowercaseMeow);
	console.log('funcPrepend', prepended);
	console.log('funcPrepend2', prepended2);
	console.log('lettergrade', lettergraded);
	console.log('flat', flattened);
	console.log('everies');
	console.log(every([1, 3, 5], (n) => n < 10));
	console.log(every([2, 4, 16], (n) => n < 10));
	console.log(every([], (n) => n < 10));
}
