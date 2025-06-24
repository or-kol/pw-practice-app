export type Route = {
  subCategory: string;
  expectedRes: string;
  xfail?: boolean; // ← The question mark makes it optional
};

export type Menu = {
  category: string;
  routes: Route[];
};
