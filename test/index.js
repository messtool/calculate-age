const { expect, should } = require("chai");
const calculateAge = require("../src/index").default;

describe("calculate-age-tool-test", () => {
  it("when param 'birth' is't a Date Object", () => {
    const fn = calculateAge.bind(calculateAge, "1990-1-1", new Date());
    expect(fn).to.throw(TypeError);
  });

  it("when param 'blocking' is't a Date Object", () => {
    const fn = calculateAge.bind(calculateAge, new Date(), "2019/11/11");
    expect(fn).to.throw(TypeError);
  });

  it("when 'blocking' less then 'birth'", () => {
    const fn = calculateAge.bind(
      calculateAge,
      new Date("2019/11/11"),
      new Date("2019/11/10")
    );
    expect(fn).to.throw(RangeError);
  });

  it("1990/1/18 ~ 1996/1/18", () => {
    const result = calculateAge(
      new Date("1990/1/18"),
      new Date("1996/1/18")
    );
    expect(result).to.deep.equal({age: 6, years: 6});
  });

  it("1990/1/18 ~ 1996/1/17", () => {
    const result = calculateAge(
      new Date("1990/1/18"),
      new Date("1996/1/17")
    );
    expect(result).to.deep.equal({age: 5, years: 5});
  });

  it("1990/2/18 ~ 1996/1/18", () => {
    const result = calculateAge(
      new Date("1990/2/18"),
      new Date("1996/1/18")
    );
    expect(result).to.deep.equal({age: 5, years: 5});
  });

  it("1990/2/18 ~ 1996/3/1", () => {
    const result = calculateAge(
      new Date("1990/2/18"),
      new Date("1996/3/1")
    );
    expect(result).to.deep.equal({age: 6, years: 6});
  });
});
