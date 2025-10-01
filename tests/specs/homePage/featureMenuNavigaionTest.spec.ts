import { test } from "../../page_objects/utils/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const menuData = require(`${TEST_PATHS.TEST_DATA}/homePage/menuData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe("Features menu navigation suite", () => {
    menuData.forEach(({ category, subCategory, expectedRes, xfail }) => {
        test(`Navigate to ${category} > ${subCategory}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${category} > ${subCategory}`);
            };
            await pageManager.featuresMenuPage.goToMenuPage(category, subCategory, expectedRes);
        });
    });
});