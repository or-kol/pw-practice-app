import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../page_objects/pageManager";
import path from "path";

const electricityConsumptionData = require(`${TEST_PATHS.TEST_DATA}/homePage/electricityConsumptionGraphData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});


test.describe("Electricity consumption graph responsiveness", () => {
    const electricityConsumption = electricityConsumptionData.electricityConsumption;

    electricityConsumption.forEach(({ x, y, expectedKwh }) => {
        const title = `Hover at (${x}, ${y}) should show ${expectedKwh}`;
        test(title, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.managementConsoleModule.electricityConsumptionGraphResponsiveness(x, y, expectedKwh);
        });
    });
});

test ("Electricity consumption switch year to 2015", async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.managementConsoleModule.electricityConsumptionSwitchYears("2015");
});

test ("Electricity consumption graph time period switch to year", async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.managementConsoleModule.changeGraphTimePeriod("year");
});