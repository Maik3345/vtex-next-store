import { buildQuery } from "./index";

describe("buildQuery", () => {
  it('should build a query string with map=ft and _q when params.map is "ft" and params._q is defined', () => {
    const params = {
      map: "ft",
      _q: "search term",
    };
    const queryString = buildQuery(params);
    expect(queryString).toEqual("ft=search term");
  });

  it("should build a query string with map=ft and _q when params.ft is defined", () => {
    const params = {
      ft: "search term",
    };
    const queryString = buildQuery(params);
    expect(queryString).toEqual("ft=search term");
  });

  it("should build a query string with fq when params.fq is defined", () => {
    const params = {
      fq: "category:shoes",
    };
    const queryString = buildQuery(params);
    expect(queryString).toEqual("fq=category:shoes");
  });

  it("should build a query string with _from and _to when params.from and params.to are defined", () => {
    const params = {
      _from: 0,
      _to: 10,
    };
    const queryString = buildQuery(params);
    expect(queryString).toEqual("_from=0&_to=10");
  });

  it("should build a query string with O when params.O is defined", () => {
    const params = {
      O: "name",
    };
    const queryString = buildQuery(params);
    expect(queryString).toEqual("O=name");
  });

  it("should build a query string with multiple parameters", () => {
    const params = {
      map: "ft",
      _q: "lavadora",
      fq: "specificationFilter_123:Blue",
      _from: 0,
      _to: 10,
      O: "name",
    };
    const queryString = buildQuery(params);
    expect(queryString).toEqual(
      "ft=lavadora&fq=specificationFilter_123:Blue&_from=0&_to=10&O=name"
    );
  });
});
