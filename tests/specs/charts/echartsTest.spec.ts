import { test, expect } from "../../base/baseTest";
import { TEST_PATHS } from "../../config/test-config";

const echartsPageData = require(`${TEST_PATHS.TEST_DATA}/charts/echrtsPageData.json`);


test.beforeEach(async ({ baseTest }) => {
    await baseTest.echartsPage.goToEchartsPage();
});


test(`Pie chart colors validation test`, async ({ baseTest }) => {
    const result = await baseTest.echartsPage.validatePieChartColors(echartsPageData.expectedColors);
    expect(result).toBeTruthy();
});



