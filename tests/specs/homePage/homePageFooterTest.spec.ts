import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const homePageFooterData = require(`${TEST_PATHS.TEST_DATA}/homePage/homePageFooterData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});


test(`Rights reseved text validation`, async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.homePageFooter.rightsReservedText();
});

test(`Aveco rights url functionality`, async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.homePageFooter.urlAvecoFunctionality();
});

test.describe(`Social networks navigation`, () => {
    const socialMedias = homePageFooterData.socialMedias;
+   socialMedias.forEach((name: string) => {
        test(`Navigate to ${name} social Network`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.homePageFooter.socialButtonsFunctionality(name);
        });
    });
});