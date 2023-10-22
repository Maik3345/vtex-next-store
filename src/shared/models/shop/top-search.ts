export interface TopSearchType {
  searches: Search[];
}

export interface Search {
  term: string;
  count: number;
}
