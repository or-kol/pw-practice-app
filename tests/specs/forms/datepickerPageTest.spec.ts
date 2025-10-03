import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../page_objects/pageManager";
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
    dates.forEach(({ name, placeholder, startOffset, endOffset }) => {
        test(`should select date(s) for ${name}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.datepickerPage.selectDates(placeholder, startOffset, endOffset);
        });
    });
});

