export function buildQuery(
  params: Partial<{
    [key: string]: string | number | boolean | string[];
  }>
) {
  const queryString = [];

  // Escenario especial para "ft"
  if (params.map === "ft" && params._q) {
    queryString.push(`query=${params._q}`);
  } else {
    if (params.ft) {
      queryString.push(`query=${params.ft}`);
    }
  }

  if (params.query) {
    queryString.push(`query=${params.query}`);
  }

  // Procesar otros filtros
  if (params.fq) {
    queryString.push(`facets=${params.fq}`);
  } else {
    if (params.facets) {
      queryString.push(`facets=${params.facets}`);
    }
  }

  // Add pagination options
  if (params.count !== undefined) {
    queryString.push(`count=${params.count}`);
  }

  // Add pagination options
  if (params.page !== undefined) {
    queryString.push(`page=${params.page}`);
  }

  // Agregar opciones de orden
  if (params.O) {
    queryString.push(`sort=${params.O}`);
  } else {
    if (params.sort) {
      queryString.push(`sort=${params.sort}`);
    }
  }

  return queryString.join("&");
}
