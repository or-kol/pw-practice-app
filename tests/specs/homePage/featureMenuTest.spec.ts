import { test, expect } from "../../base/baseTest";
import rawMenuData from "../../data/menuData.json";


test.describe("Features menu navigation suite", () => {
    for (const [category, {routes}] of Object.entries(rawMenuData)) {
        for (const { subCategory, expectedRes, xfail} of routes) {
            test(`Navigate to ${category} > ${subCategory}`, async ({ baseTest }) => {
                if (xfail) {
                    test.fail(true, `Expected failure for ${category} > ${subCategory}`);
                }

                const isLoaded = await baseTest.featureMenu.goToMenuPage(category, subCategory, expectedRes);
                expect(isLoaded).toBeTruthy();
            });
        }
    }
});


