import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const areaStackChartData = require(`${TEST_PATHS.TEST_DATA}/charts/areaStackChartData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.barChartModule.goToEchartsPage();
});

test(`Area stack chart colors validation test`, async ({}, testInfo) => {
    const expectedColors = areaStackChartData.chartColors.map((segment: any) => segment.color);
    handleXfail(testInfo, specFile);
    await pageManager.areaStackChartModule.validateAreaStackChartColors(expectedColors);
});


test.describe(`Area stack chart data validation test suite`, () => {
    const days = areaStackChartData.chartDays;
    days.forEach(({ day, xAxis, yAxis, stacks }) => {
        stacks.forEach(({ areaStack, value }) => {
            test(`${day} ${areaStack} data validation test`, async ({}, testInfo) => {
                handleXfail(testInfo, specFile);
                await pageManager.areaStackChartModule.areaStackChartContentValidation(day, xAxis, yAxis, areaStack, value);
            });
        });
    });
});

