const each = require('jest-each').default;
const ex = require('../exercise');

describe('divisibleBy', () => {

  each([
    ['this is no number'],
    [new Date()],
    [{}],
    [[]]
  ]).it('should throw exception when divisor is no number (%s)', (input) => {
    expect(() => ex.divisibleBy(input, 1)).toThrow();
  });

  each([
    ['this is no number'],
    [new Date()],
    [{}],
    [[]]
  ]).it('should throw exception when dividend is no number (%s)', (input) => {
    expect(() => ex.divisibleBy(1, input)).toThrow();
  });

  it('should throw exception when dividend is zero', () => {
    expect(() => ex.divisibleBy(1, 0)).toThrow();
  });

  each([
    [true, 8, 2], // expected, divisor, dividend
    [false, 10, 3]
  ]).it('should return %s when dividing %s by %s', (expected, divisor, dividend) => {
    expect(ex.divisibleBy(divisor, dividend)).toBe(expected);
  });
});