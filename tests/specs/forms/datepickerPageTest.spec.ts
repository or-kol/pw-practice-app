import { test } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import type { DatepickerType } from "../../types/datepickerType";
import { TEST_PATHS } from "../../config/test-config";

const datepickerData = require(`${TEST_PATHS.TEST_DATA}/forms/datepickerData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.datepickerPage.goToDatePickerPage();
});

test.describe("Datepicker tests from JSON", () => {
    datepickerData.forEach(({ name, placeholder, startOffset, endOffset, xfail }) => {
        test(`should select date(s) for ${name}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${placeholder} with startOffset ${startOffset} and endOffset ${endOffset}`);
            }
            await pageManager.datepickerPage.selectDates(placeholder, startOffset, endOffset);
        });
    });
});

