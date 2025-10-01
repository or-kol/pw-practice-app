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
    const positions = toastsPageData.positions 
    positions.forEach(({ position, vertical, horizontal, xfail }) => {
        test(`Toastr position: ${position} test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for toastr position: ${position}`);
            }
            await pageManager.toastrPage.toastPositionValidation(position, vertical, horizontal);
        });
    });
});


test.describe(`Toastr content validation test suite`, () => {
    const tabContent = toastsPageData.TabContent;
    tabContent.forEach(({ testNum, title, message, xfail }) => {
        test(`Toastr content #${testNum} test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for toastr content: ${title}`);
            }
            await pageManager.toastrPage.toastrTabContentValidation(title, message);
        });
    });
}); 


test.describe(`Toastr duration validation test suite`, () => {
    const tabContent = toastsPageData.TabContent;
    tabContent.forEach(({ testNum, title, timeout, xfail }) => {
        test(`Toastr duration #${testNum} test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for toastr content: ${title}`);
            }
            await pageManager.toastrPage.toastrDurationValidation(timeout);
        });
    });
});


test.describe(`Toastr type validation test suite`, () => {
    const toastTypes = toastsPageData.toastTypes;
    toastTypes.forEach(({ type, xfail }) => {
        test(`Toastr type: ${type} test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for toastr type: ${type}`);
            }
            await pageManager.toastrPage.toastTypeValidation(type);
        });
    });
});