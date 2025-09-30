import { test, expect } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const electricityConsumptionData = require(`${TEST_PATHS.TEST_DATA}/homePage/electricityConsumptionGraphData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe("Electricity consumption graph responsivnes", () => {
    for (const config of electricityConsumptionData.electricityConsumtion) {
        const title = `Hover at (${config.x}, ${config.y}) should show ${config.expectedKwh}`;

        test(`${title}${config.xfail ? ' (expected failure)' : ''}`, async () => {
            if (config.xfail) {
                test.fail(true, `Expected failure: Tooltip may not appear at offset (${config.x}, ${config.y}) for ${config.expectedKwh}`);
            }
            const result = await pageManager.managementConsoleModule.electricityConsumptionGraphResponsivnes(config.x, config.y, config.expectedKwh);
            expect(result).toBe(true);
        });
    };
});

test ("Electricity consumption switch year to 2015", async () => {
    const result = await pageManager.managementConsoleModule.electricityConsumptionSwitchYears("2015");
    expect(result).toBeTruthy();
});

test ("Electricity consumption graph time period switch to year", async () => {
    const result = await pageManager.managementConsoleModule.changeGraphTimePeriod("year");
    expect(result).toBeTruthy();
});