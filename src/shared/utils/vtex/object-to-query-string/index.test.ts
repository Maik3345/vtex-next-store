import { objectToQueryString } from ".";

describe("objectToQueryString", () => {
  it("should return an empty string when the object is empty", () => {
    const obj = {};
    const queryString = objectToQueryString(obj);
    expect(queryString).toEqual("");
  });

  it("should return a query string with one parameter when the object has one key-value pair", () => {
    const obj = {
      key1: "value1",
    };
    const queryString = objectToQueryString(obj);
    expect(queryString).toEqual("key1=value1");
  });

  it("should return a query string with multiple parameters when the object has multiple key-value pairs", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
      key3: 123,
      key4: true,
      key5: "value3",
      key6: ["value4", "value5"],
    };
    const queryString = objectToQueryString(obj);
    expect(queryString).toEqual(
      "key1=value1&key2=value2&key3=123&key4=true&key5=value3&key6=value4&key6=value5"
    );
  });

  it("should exclude keys specified in the exclude parameter", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };
    const exclude = ["key2", "key3"];
    const queryString = objectToQueryString(obj, exclude);
    expect(queryString).toEqual("key1=value1");
  });
});
