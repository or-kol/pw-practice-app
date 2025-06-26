import {expect} from "@playwright/test";
import { test } from "../../base/baseTest";
import type { DatepickerType } from "../../types/datepickerType";
import datepickerData from "../../data/datepickerData.json";


test.beforeEach(async({page}) => {
    await page.goto("http://localhost:4200/pages/forms/datepicker");
})


test.describe("Datepicker tests from JSON", () => {
    for (const [name, config] of Object.entries(datepickerData) as [string, DatepickerType][]) {
        test(`should select date(s) for ${name}`, async ({ baseTest }) => {
            if (config.xfail) {
                test.fail(true, `Expected failure for ${config.placeholder} 
                                 with startOffset ${config.startOffset} 
                                 and endOffset ${config.endOffset}`);
            }

            const isValid = await baseTest.datepickerPage.selectDates(
                config.placeholder,
                config.startOffset,
                config.endOffset
            );

            expect(isValid).toBe(config.expectedResult);
        });
    }
});


