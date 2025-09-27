import { test, expect } from "../../base/baseTest";
import { TEST_PATHS } from "../../config/test-config";

const trafficConsumptionData = require(`${TEST_PATHS.TEST_DATA}/trafficConsumptionData.json`) as any;

test.describe(`Trafic consumption time period selection test suite`, () => {
    trafficConsumptionData.periods.forEach((period) => {
        test(`Select "${period.name}" period`, async ({ baseTest }) => {
            if (period.xfail) {
                test.fail(true, `Expected failure for period: ${period.name}`);
            };
            const result = await baseTest.trafficConsumption.traficConsumptionPeriod(period.name);
            expect(result).toBeTruthy();
        });
    });
});


