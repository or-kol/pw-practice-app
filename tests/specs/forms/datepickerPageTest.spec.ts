import { test, expect } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import type { DatepickerType } from "../../types/datepickerType";
import { TEST_PATHS } from "../../config/test-config";

const datepickerData = require(`${TEST_PATHS.TEST_DATA}/forms/datepickerData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe("Datepicker tests from JSON", () => {
    for (const [name, config] of Object.entries(datepickerData) as [string, DatepickerType][]) {
        test(`should select date(s) for ${name}`, async () => {
            if (config.xfail) {
                test.fail(true, `Expected failure for ${config.placeholder} 
                                 with startOffset ${config.startOffset} 
                                 and endOffset ${config.endOffset}`);
            }
            
            await pageManager.datepickerPage.goToDatePickerPage();
            const isValid = await pageManager.datepickerPage.selectDates(
                config.placeholder,
                config.startOffset,
                config.endOffset
            );

            expect(isValid).toBe(config.expectedResult);
        });
    }
});

