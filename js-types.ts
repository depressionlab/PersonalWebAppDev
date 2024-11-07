// First Class Functions: 1. This prints out the number 6.
export const addN: (n: number) => (x: number) => number = (n) => (x) => x + n;

// Exercises
// 1
export const toLowercase = <S extends string>(s: S) => s.toLocaleLowerCase() as Lowercase<S>;

// 2
export type FuncPrepend = <Prefix extends string>(prefix: Prefix) => <String extends string>(s: String) => `${Prefix & string} ${String & string}`;
export const funcPrepend: FuncPrepend = (prefix) => (s) => `${prefix} ${s}`;

// 3
export type FuncPrepend2 = <Prefix extends string>(prefix: Prefix) => <Postfix extends string>(postfix: Postfix) => <String extends string>(s: String) => `${Prefix & string} ${String & string} ${Postfix & string}`;
export const funcPrepend2: FuncPrepend2 = (prefix) => (postfix) => (s) => `${prefix} ${s} ${postfix}`;

// 4
export type GradeRange = 'A' | 'B' | 'C' | 'D' | 'F';
export function lettergrade<Scores extends readonly number[]>(scores: Scores): GradeRange[] {
	return scores.map((score) => {
		if (score >= 89.5) return 'A';
		if (score >= 79.5) return 'B';
		if (score >= 69.5) return 'C';
		if (score >= 59.5) return 'D';
		return 'F';
	});
}

// 5
export function flat<Arrays, Depth extends number = 1>(arrays: Arrays, depth?: Depth): FlatArray<Arrays, Depth>[] {
	return <FlatArray<Arrays, Depth>[]> Array.prototype.flat.apply(arrays, [depth]);
}

// 6
export function every<T>(array: Array<T>, test: (value: T) => unknown): boolean {
	for (let i = 0; i < array.length; i++) {
		if (!test(array[i])) {
			return false;
		}
	}

	return true;
}
