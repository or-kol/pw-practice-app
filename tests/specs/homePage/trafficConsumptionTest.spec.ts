import { test, expect } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const trafficConsumptionData = require(`${TEST_PATHS.TEST_DATA}/homePage/trafficConsumptionData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe(`Trafic consumption time period selection test suite`, () => {
    trafficConsumptionData.periods.forEach((period) => {
        test(`Select "${period.name}" period`, async () => {
            if (period.xfail) {
                test.fail(true, `Expected failure for period: ${period.name}`);
            };
            const result = await pageManager.trafficConsumption.traficConsumptionPeriod(period.name);
            expect(result).toBeTruthy();
        });
    });
});


