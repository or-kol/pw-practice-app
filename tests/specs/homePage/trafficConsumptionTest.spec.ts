import { test } from "../../page_objects/utils/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const trafficConsumptionData = require(`${TEST_PATHS.TEST_DATA}/homePage/trafficConsumptionData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe(`Traffic consumption time span selection test suite`, () => {
    const timeSpans = trafficConsumptionData.timeSpans;
    timeSpans.forEach(({ name, xfail }) => {
        test(`Select "${name}" time span`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for time span: ${name}`);
            };
            await pageManager.trafficConsumption.trafficConsumptionTimeSpan(name);
        });
    });
});


