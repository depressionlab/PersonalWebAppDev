import { describe, it } from '@std/testing/bdd';
import { assertAlmostEquals, assertEquals } from '@std/assert';
import { f, fac, getValue } from './assignments/wasm/library/toolkit.wasm';
import { getTimeInSeconds } from './assignments/wasm/time.ts';

describe('webassembly', () => {
	it('should work', () => {
		assertAlmostEquals(getValue(), getTimeInSeconds());
		assertEquals(f(1), 1);
		assertEquals(fac(0), 1);
	});
});
