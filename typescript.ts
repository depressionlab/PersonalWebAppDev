const foo7: number = 23.8;
const foo8: Array<number | string> = [1, 2, 3, 4, 5, 'hi'];
const foo9: { bar: string, 2: number } = { 'bar': 'baz', 2: 3 };
const foo10: (x: number) => number = (x) => x + 5;
// foo10("hello") >>> "hello5"
// foo10(4) >>> 9
function foo11(x: number) {
	return function (y: number) {
		return x + y;
	};
}

type Citizen = {
	id: number;
	name: string;
	description?: string;
};
interface Person {
	id: number;
	name: string;
	description?: string;
}

interface Student extends Person {
	gpa: number;
}
