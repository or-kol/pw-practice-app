import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../page_objects/pageManager";
import path from "path";

const menuData = require(`${TEST_PATHS.TEST_DATA}/homePage/menuData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});


test.describe("Features menu navigation suite", () => {
    const menuItems = menuData.menuItems;
    menuItems.forEach(({ category, subCategory, expectedRes }) => {
        test(`Navigate to ${category} > ${subCategory}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.featuresMenuPage.goToMenuPage(category, subCategory, expectedRes);
        });
    });
});