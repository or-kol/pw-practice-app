import { test } from "../../base/baseTest";
import { expect } from "@playwright/test";
import SwitchersData from "../../data/deviceControlSwitchesData.json";
import tempSwitcherData from "../../data/tempSwitcherData.json";


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


test("Temp switch test - direct element edit", async ({baseTest}) => {
    const result = await baseTest.deviceControlModule.tempSwitch();
    expect(result).toBeTruthy();
})


test.describe("Temperature Switch Test Suite - Mouse Movement", () => {
    tempSwitcherData.tempSwitch.forEach(({ x, y, expectedTemp, xfail }, index) => {
        test(`Case ${index + 1}: offset(x=${x}, y=${y}) → expected ${expectedTemp}°`, async ({ baseTest }) => {
            const result = await baseTest.deviceControlModule.tempSwitch2(x, y, expectedTemp);
            
            if (xfail) {
                test.fail(true, `Expected failure for offset(x=${x}, y=${y}) → expected ${expectedTemp}°`);
            }
            expect(result).toBeTruthy();
        });
    });
});


test("Temp cool state", async ({ baseTest }) => {
    const result = await baseTest.deviceControlModule.tempSwitchStates("warm");
    expect(result).toBeTruthy();
});


test.describe("Temperature State Switching", () => {
    const temperatureStates: string[] = ["cool", "warm", "heat", "fan"];

    for (const state of temperatureStates) {
        test(`should switch to "${state}" mode`, async ({ baseTest }) => {
            const result = await baseTest.deviceControlModule.tempSwitchStates(state);
            expect(result).toBeTruthy();
        });
    }
});


test ("temp on/off switch", async ({baseTest}) => {
    const result = await baseTest.deviceControlModule.tempSwitchOnOffButton("on");
    expect(result).toBeTruthy();
})

test.describe("Temperature On/Off Button Behavior", () => {
    ["on", "off"].forEach((state) => {
        test(`should switch temperature to "${state}"`, async ({ baseTest }) => {
            const result = await baseTest.deviceControlModule.tempSwitchOnOffButton(state as "on" | "off");
            expect(result).toBeTruthy();
        });
    });
});

