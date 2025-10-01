import { test } from "../../page_objects/utils/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const electricityConsumptionData = require(`${TEST_PATHS.TEST_DATA}/homePage/electricityConsumptionGraphData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe("Electricity consumption graph responsivnes", () => {
    electricityConsumptionData.electricityConsumtion.forEach(({ x, y, expectedKwh, xfail }) => {
        const title = `Hover at (${x}, ${y}) should show ${expectedKwh}`;
        test(`${title}${xfail ? ' (expected failure)' : ''}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure: Tooltip may not appear at offset (${x}, ${y}) for ${expectedKwh}`);
            }
            await pageManager.managementConsoleModule.electricityConsumptionGraphResponsivnes(x, y, expectedKwh);
        });
    });
});

test ("Electricity consumption switch year to 2015", async () => {
    await pageManager.managementConsoleModule.electricityConsumptionSwitchYears("2015");
});

test ("Electricity consumption graph time period switch to year", async () => {
    await pageManager.managementConsoleModule.changeGraphTimePeriod("year");
});