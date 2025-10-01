import { test } from "../../page_objects/utils/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const homePageFooterData = require(`${TEST_PATHS.TEST_DATA}/homePage/homePageFooterData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test(`Rights reseved text validation`, async () => {
    await pageManager.homePageFooter.rightsReservedText();
});

test(`Aveco rights url functionality`, async () => {
    await pageManager.homePageFooter.urlAvecoFunctionality();
});

test.describe(`Social networks navigation`, () => {
    homePageFooterData.socialMedias.forEach(({ name, xfail }) => {
        test(`Navigate to ${name} social Network`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${name} social Network`);
            }
            await pageManager.homePageFooter.socialButtonsFunctionality(name);
        });
    });
});