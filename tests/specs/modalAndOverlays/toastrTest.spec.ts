import { test } from "../../base/browserSetup"
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const toastsPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/toastrPageData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.toastrPage.goToToastrPage();
});


test.describe(`Toastr position validation test suite`, () => {
    const toastrPositions = toastsPageData.positions;
    toastrPositions.forEach((position) => {
        test(`Toastr position: ${position.position} test`, async () => {
            if (position.xfail) {
                test.fail(true, `Expected failure for toastr position: ${position.position}`);
            };
            await pageManager.toastrPage.toastPositionValidation(position.position, position.vertical, position.horizontal);
        });
    });
});


test.describe(`Toastr content validation test suite`, () => {
    const toastrContent = toastsPageData.TabContent;
    toastrContent.forEach((content) => {
        test(`Toastr content #${content.testNum} test`, async () => {
            if (content.xfail) {
                test.fail(true, `Expected failure for toastr content: ${content.title}`);
            };
            await pageManager.toastrPage.toastrTabContentValidation(content.title, content.message);
        });
    });
}); 


test.describe(`Toastr duration validation test suite`, () => {
    const toastrContent = toastsPageData.TabContent;
    toastrContent.forEach((content) => {
        test(`Toastr duration #${content.testNum} test`, async () => {
            if (content.xfail) {
                test.fail(true, `Expected failure for toastr content: ${content.title}`);
            };
            await pageManager.toastrPage.toastrDurationValidation(content.timeout);
        });
    });
});


test.describe(`Toastr type validation test suite`, () => {
    const toastrTypes = toastsPageData.toastTypes;
    toastrTypes.forEach((type) => {
        test(`Toastr type: ${type.type} test`, async () => {
            if (type.xfail) {
                test.fail(true, `Expected failure for toastr type: ${type.type}`);
            };
            await pageManager.toastrPage.toastTypeValidation(type.type);
        });
    });
});