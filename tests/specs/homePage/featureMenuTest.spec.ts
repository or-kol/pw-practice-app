import { test, expect } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const rawMenuData = require(`${TEST_PATHS.TEST_DATA}/homePage/menuData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe("Features menu navigation suite", () => {
    for (const [category, {routes}] of Object.entries(rawMenuData) as any[]) {
        for (const { subCategory, expectedRes, xfail} of routes as any[]) {
            test(`Navigate to ${category} > ${subCategory}`, async () => {
                if (xfail) {
                    test.fail(true, `Expected failure for ${category} > ${subCategory}`);
                };
                const isLoaded = await pageManager.featuresMenuPage.goToMenuPage(category, subCategory, expectedRes);
                expect(isLoaded).toBeTruthy();
            });
        };
    };
});