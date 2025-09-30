import { test, expect } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const homePageFooterData = require(`${TEST_PATHS.TEST_DATA}/homePage/homePageFooterData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test(`Rights reseved text validation`, async () => {
    const result = await pageManager.homePageFooter.rightsReservedText();
    expect(result).toBeTruthy();
});

test(`Aveco rights url functionality`, async () => {
    const result = await pageManager.homePageFooter.urlAvecoFunctionality();
    expect(result).toBeTruthy();
});

test.describe(`Social networks navigation`, () => {
    homePageFooterData.socialMedias.forEach((socialMedia) => {
        test(`Navigate to ${socialMedia.name} social Network`, async () => {
            if (socialMedia.xfail) {
                test.fail(true, `Expected failure for ${socialMedia.name} social Network`);
            };
            const result = await pageManager.homePageFooter.socialButtonsFunctionality(socialMedia.name);
            expect(result).toBeTruthy();
        });
    });
});