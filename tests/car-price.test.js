import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePrice } from '../src/car-price.js';

test('rabat 10% obniża cenę samochodu', () => {
  assert.equal(calculatePrice(79900, 10), 71910);
});

test('rabat 150% jest odrzucany', () => {
  assert.throws(
    () => calculatePrice(79900, 150),
    RangeError
  );
});
