let foo = require('../src/foo.js');

describe("A suite is just a function", function() {
  it("and so is a spec", function() {
    expect(foo).toBe(true);
  });
});
