const foo7 = 23.8;
const foo8 = [1, 2, 3, 4, 5, 'hi'];
const foo9 = { 'bar': 'baz', 2: 3 };
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
