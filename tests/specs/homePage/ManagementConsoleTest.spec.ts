import { test, expect } from "../../base/baseTest";
import electricityConsumptionData from "../../data/electricityConsumptionGraphData.json"


test.describe("Electricity consumption graph responsivnes", () => {
    for (const config of electricityConsumptionData.electricityConsumtion) {
        const title = `Hover at (${config.x}, ${config.y}) should show ${config.expectedKwh}`;

        test(`${title}${config.xfail ? ' (expected failure)' : ''}`, async ({ baseTest }) => {
            if (config.xfail) {
                test.fail(true, `Expected failure: Tooltip may not appear at offset (${config.x}, ${config.y}) for ${config.expectedKwh}`);
            }
            const result = await baseTest.managementConsoleModul.electricityConsumptionGraphResponsivnes(config.x, config.y, config.expectedKwh);
            expect(result).toBe(true);
        });
    };
});


test ("Electricity consumption switch year to 2015", async({baseTest}) => {
    const result = await baseTest.managementConsoleModul.electricityConsumptionSwitchYears("2015");
    expect(result).toBeTruthy();
});


test ("Electricity consumption graph time period switch to year", async({baseTest}) => {
    const result = await baseTest.managementConsoleModul.changeGraphTimePeriod("year");
    expect(result).toBeTruthy();
});