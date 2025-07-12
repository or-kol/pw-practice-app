import { test } from "../../base/baseTest";
import { expect } from "@playwright/test";
import electricityConsumptionData from "../../data/electricityConsumptionGraphData.json"

test.beforeEach(async({baseTest}) => {
    await baseTest.deviceControlModule.navigateTo("http://localhost:4200/")
})

test.describe("Electricity consumption graph responsivnes", () => {
    for (const config of electricityConsumptionData.electricityConsumtion) {
        const title = `Hover at (${config.x}, ${config.y}) should show ${config.expectedKwh}`;

        test(`${title}${config.xfail ? ' (expected failure)' : ''}`, async ({ baseTest }) => {
            const result = await baseTest.managementConsoleModul.electricityConsumptionGraphResponsivnes(config.x, config.y, config.expectedKwh);

            if (config.xfail) {
                test.fail(true, `Expected failure: Tooltip may not appear at offset (${config.x}, ${config.y}) for ${config.expectedKwh}`);
            }
            expect(result).toBe(true);
        });
    }
})