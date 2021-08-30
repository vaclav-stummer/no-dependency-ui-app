const sum = require('./index.js');

describe('Util functions', () => {
  it('expects to sum 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
