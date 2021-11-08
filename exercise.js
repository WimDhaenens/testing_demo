
module.exports.divisibleBy = function(divisor, dividend) {
  if (typeof divisor !== 'number')
    throw new Error('divisor should be a number.');
  if (typeof dividend !== 'number')
    throw new Error('dividend should be a number.');
  if (dividend === 0)
    throw new Error('division by zero is not allowed');
  return input % dividend === 0;
}