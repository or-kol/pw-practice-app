import { test, expect } from "../../base/baseTest";
import rawMenuData from "../../data/menuData.json";
import type { MenuType } from "../../types/menuType";


const menuData = rawMenuData as MenuType[];

test.describe("Data-driven Navigation", () => {
    for (const { category, routes } of menuData) {
        for (const { subCategory, expectedRes, xfail} of routes) {
            test(`Navigate to ${category} > ${subCategory}`, async ({ baseTest }) => {
                if (xfail) {
                    test.fail(true, `Expected failure for ${category} > ${subCategory}`);
                }

                const isLoaded = await baseTest.featureMenu.goToMenuPage(category, subCategory, expectedRes);
                expect(isLoaded).toBe(true);
            });
        }
    }
});


