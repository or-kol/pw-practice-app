import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const datepickerData = require(`${TEST_PATHS.TEST_DATA}/forms/datepickerData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.datepickerPage.goToDatePickerPage();
});


test.describe("Datepicker tests from JSON", () => {
    const dates = datepickerData.datePickers;
    dates.forEach(({ name, placeholder, startOffset, endOffset, expectInvalid }) => {
        test(`Select date(s) for ${name} test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            if (endOffset !== undefined) {
                await pageManager.datepickerPage.selectDateRange(placeholder, startOffset, endOffset);
            } else {
                await pageManager.datepickerPage.selectSingleDate(placeholder, startOffset, expectInvalid);
            };
        });
    });
});

