import { test, expect } from "../../base/baseTest";
import SwitchersData from "../../data/deviceControlSwitchesData.json";
import tempAndHumidSwitcherData from "../../data/tempAndHumidSwitcherData.json";


test.describe('Device controller tests', () => {
    for (const config of SwitchersData.switchers) {
        const title = `${config.controllerName} should be switched ${config.desiredStatus}`;

        test(`${title}${config.xfail ? ' (expected failure)' : ''}`, async ({ baseTest }) => {
            const result = await baseTest.deviceControlModule.buttonControlerSwitch(
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


test.describe("Temp & Humidity Switch - Direct Element Edit", () => {
    ["Temperature", "Humidity"].forEach((mode) => {
        test(`${mode} switch test - direct element edit`, async ({ baseTest }) => {
            const result = await baseTest.deviceControlModule.tempandHumiditySwitch(mode as "Temperature" | "Humidity");
            expect(result).toBeTruthy();
        });
    });
});


test.describe("Temp & Humidity Switch - Mouse Movement Switch Test - Temp & Humidity", () => {
    Object.entries(tempAndHumidSwitcherData).forEach(([key, dataset]) => {
        const mode = key === "tempSwitch" ? "Temperature" : "Humidity";
        const expectedField = key === "tempSwitch" ? "expectedTemp" : "expectedHuimid";

        dataset.forEach((entry, index) => {
            const { x, y, xfail } = entry;
            const expected = entry[expectedField];

            test(`${mode} Case ${index + 1}: offset(${x}, ${y}) → expected ${expected}`, async ({ baseTest }) => {
                const result = await baseTest.deviceControlModule.tempandHumiditySwitch2(mode, x, y, expected);

                if (xfail) {
                    test.fail(true, `Expected failure for ${mode} offset(${x}, ${y}) → expected ${expected}`);
                }

                expect(result).toBeTruthy();
            });
        });
    });
});


test.describe("Temperature State Switching", () => {
    const temperatureStates: string[] = ["cool", "warm", "heat", "fan"];

    for (const state of temperatureStates) {
        test(`should switch to "${state}" mode`, async ({ baseTest }) => {
            const result = await baseTest.deviceControlModule.acStatesSwitch(state);
            expect(result).toBeTruthy();
        });
    }
});


test.describe("Temperature On/Off Button Behavior", () => {
    ["on", "off"].forEach((state) => {
        test(`should switch temperature to "${state}"`, async ({ baseTest }) => {
            const result = await baseTest.deviceControlModule.tempSwitchOnOffButton(state as "on" | "off");
            expect(result).toBeTruthy();
        });
    });
});


