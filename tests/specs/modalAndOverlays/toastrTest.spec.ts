import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const toastrPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/toastrPageData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.toastrPage.goToToastrPage();
});


test.describe(`Toastr position validation test suite`, () => {
    const positions = toastrPageData.variants.positions;
    positions.forEach(({ position, vertical, horizontal }: { position: string, vertical: string, horizontal: string }) => {
        test(`Toastr position: ${position} test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.toastrPage.toastPositionValidation(position, vertical, horizontal);
        });
    });
});

test.describe(`Toastr content validation test suite`, () => {
    const tabContents = toastrPageData.tabContents;
    tabContents.forEach(({ title, message }: { title: string, message: string }) => {
        test(`${title} toastr content test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.toastrPage.toastrTabContentValidation(title, message);
        });
    });
});

test.describe(`Toastr duration validation test suite`, () => {
    const tabContents = toastrPageData.tabContents;
    tabContents.forEach(({ title, timeout }: { title: string, timeout: number }) => {
        test(`${title} toastr duration test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.toastrPage.toastrDurationValidation(timeout);
        });
    });
});

test.describe(`Toastr type validation test suite`, () => {
    const toastTypes = toastrPageData.toastTypes;
    toastTypes.forEach((type: string) => {
        test(`Toastr type: ${type} test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.toastrPage.toastTypeValidation(type);
        });
    });
});