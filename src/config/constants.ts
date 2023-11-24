export const SHOP_KEY = "shop";
export const MATCH_KEYS = [
  "hierarchy.lvl1",
  "hierarchy.lvl2",
  "hierarchy.lvl3",
  "content",
];
export const RECENT_SEARCHES_KEY = "recent-searches";
export const MAX_RECENT_SEARCHES = 10;
export const MAX_RESULTS = 20;
export const endpoints = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  vtex: {
    environment: "vtexcommercestable.com.br",
    search: {
      searchProductsByTerm: "/api/io/_v/api/intelligent-search/product_search",
      getTopSearch: "/api/io/_v/api/intelligent-search/top_searches",
      getSuggestionsBySearch:
        "/api/io/_v/api/intelligent-search/search_suggestions",
      getProductsByTerm: "/api/io/_v/api/intelligent-search/product_search",
    },
    local: {
      searchProductsByTerm: "/api/search-by-term",
      getTopSearch: "/api/top-search",
      getSuggestionsBySearch: "/api/search-suggestions",
      getProductsByTerm: "/api/search-products",
    },
  },
};
