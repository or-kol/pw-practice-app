import { test, expect } from "../../base/baseTest";


test.describe(`Trafic consumption time period selection test suite`, () => {
    [`week`, `month`, `year`].forEach((period) => {
        test(`Select "${period}" period`, async ({ baseTest }) => {
            const result = await baseTest.trafficConsumption.traficConsumptionPeriod(period);
            expect(result).toBeTruthy();
        });
    });
});


