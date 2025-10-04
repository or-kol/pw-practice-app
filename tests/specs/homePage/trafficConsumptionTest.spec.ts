import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const trafficConsumptionData = require(`${TEST_PATHS.TEST_DATA}/homePage/trafficConsumptionData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});


test.describe(`Traffic consumption time span selection test suite`, () => {
    const timeSpans = trafficConsumptionData.timeSpans;
    timeSpans.forEach((name: string) => {
        test(`Select "${name}" time span`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.trafficConsumption.trafficConsumptionTimeSpan(name);
        });
    });
});


