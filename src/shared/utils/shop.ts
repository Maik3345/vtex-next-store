/**
 * The function `normalizeShopName` takes a string parameter `shop`, converts it to lowercase, and
 * removes any whitespace characters.
 * @param {string} shop - The `shop` parameter is a string representing the name of a shop.
 * @returns The normalized shop name, which is the input shop name converted to lowercase and with all
 * spaces removed.
 */
export const normalizeShopName = (shop: string) => {
  return shop.toLocaleLowerCase().replace(/\s/g, "");
};

/**
 * The function `sliceShopName` takes a shop name as input, normalizes it, and returns a sliced
 * version of the name if it exceeds 16 characters, with an ellipsis appended.
 * @param {string} shop - The `shop` parameter is a string that represents the name of a shop.
 * @returns the sliced shop name. If the length of the shop name is greater than 16 characters, it will
 * return the first 16 characters followed by "...". Otherwise, it will return the full shop name.
 */
export const sliceShopName = (shop: string) => {
  const shopName = normalizeShopName(shop);
  return shopName.length > 16 ? `${shopName.slice(0, 16)}...` : shopName;
};
