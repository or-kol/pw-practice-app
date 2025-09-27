import { test, expect } from "../../base/baseTest";
import { TEST_PATHS } from "../../config/test-config";

const rawMenuData = require(`${TEST_PATHS.TEST_DATA}/menuData.json`) as any;

test.describe("Features menu navigation suite", () => {
    for (const [category, {routes}] of Object.entries(rawMenuData) as any[]) {
        for (const { subCategory, expectedRes, xfail} of routes as any[]) {
            test(`Navigate to ${category} > ${subCategory}`, async ({ baseTest }) => {
                if (xfail) {
                    test.fail(true, `Expected failure for ${category} > ${subCategory}`);
                };
                const isLoaded = await baseTest.featureMenu.goToMenuPage(category, subCategory, expectedRes);
                expect(isLoaded).toBeTruthy();
            });
        };
    };
});


