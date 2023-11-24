/**
 * The function `objectToQueryString` converts an object into a query string format.
 * @param obj - The `obj` parameter is an object of type `Record<string, unknown>`. This means that it
 * is an object with string keys and values of unknown type.
 * @returns The function `objectToQueryString` returns a string that represents the given object as a
 * query string.
 */
export const objectToQueryString = (
  obj: Partial<{
    [key: string]: string | number | boolean | string[];
  }>,
  exclude: string[] = []
) => {
  const filteredParams = Object.keys(obj)
    .reduce((acc: string[], key: string) => {
      if (!exclude.includes(key)) {
        const value = obj[key];
        if (
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
        ) {
          acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        } else if (Array.isArray(value)) {
          value.forEach((val: string) => {
            acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
          });
        }
      }
      return acc;
    }, [])
    .join("&");

  return filteredParams;
};
