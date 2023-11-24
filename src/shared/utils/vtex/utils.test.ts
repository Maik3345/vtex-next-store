import { normalizeShopName, sliceShopName } from "./utils";

describe("normalizeShopName", () => {
  it("should return a lowercase string with no spaces", () => {
    const shopName = "My Shop Name";
    const normalizedShopName = normalizeShopName(shopName);
    expect(normalizedShopName).toEqual("myshopname");
  });

  it("should return an empty string when passed an empty string", () => {
    const shopName = "";
    const normalizedShopName = normalizeShopName(shopName);
    expect(normalizedShopName).toEqual("");
  });

  it("should return the same string when passed a string with no spaces", () => {
    const shopName = "myshopname";
    const normalizedShopName = normalizeShopName(shopName);
    expect(normalizedShopName).toEqual("myshopname");
  });

  it("should return a lowercase string with no spaces when passed a string with leading/trailing spaces", () => {
    const shopName = "  My Shop Name  ";
    const normalizedShopName = normalizeShopName(shopName);
    expect(normalizedShopName).toEqual("myshopname");
  });
});
describe("sliceShopName", () => {
  it("should return the same string when the length is less than or equal to 16", () => {
    const shopName = "myshopname";
    const slicedShopName = sliceShopName(shopName);
    expect(slicedShopName).toEqual("myshopname");
  });

  it("should return a string with ellipsis when the length is greater than 16", () => {
    const shopName = "myshopname123456789";
    const slicedShopName = sliceShopName(shopName);
    expect(slicedShopName).toEqual("myshopname123456...");
  });

  it("should return a string with ellipsis when the length is exactly 16", () => {
    const shopName = "myshopname1234567";
    const slicedShopName = sliceShopName(shopName);
    expect(slicedShopName).toEqual("myshopname123456...");
  });

  it("should return an empty string when passed an empty string", () => {
    const shopName = "";
    const slicedShopName = sliceShopName(shopName);
    expect(slicedShopName).toEqual("");
  });
});
