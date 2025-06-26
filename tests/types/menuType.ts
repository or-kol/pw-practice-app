export type Route = {
    subCategory: string;
    expectedRes: string;
    xfail?: boolean;
};

export type MenuType = {
    category: string;
    routes: Route[];
};
