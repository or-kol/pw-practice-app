import { test } from "../../base/baseTest";
import { expect } from "@playwright/test";
import SwitchersData from "../../data/deviceControlSwitchesData.json";
import type { DeviceControllerSwithcesType } from "../../types/deviceControllerSwithces";

test.beforeEach(async({baseTest}) => {
    await baseTest.deviceControlModule.navigateTo("http://localhost:4200/")
})


test.describe('Device controller tests', () => {
    for (const config of SwitchersData.switchers) {
        const title = `${config.controllerName} should be switched ${config.desiredStatus}`;

        test(`${title}${config.xfail ? ' (expected failure)' : ''}`, async ({ baseTest }) => {
            const result = await baseTest.deviceControlModule.controlerSwitch(
                config.controllerName,
                config.desiredStatus as 'ON' | 'OFF'
            );

            if (config.xfail) {
                test.fail(true, `Expected failure for ${config.controllerName} > turn ${config.desiredStatus}`);
            }
            expect(result).toBe(true);
        });
    }
});

test("Temp switch test", async ({baseTest}) => {
    const result = await baseTest.deviceControlModule.tempSwitch();
    expect(result).toBeTruthy();
})
