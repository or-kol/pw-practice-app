import { test, expect } from "../../base/baseTest";
import trafficConsumptionData from "../../data/trafficConsumptionData.json";

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


