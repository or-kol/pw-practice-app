import { test, expect } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const SwitchersData = require(`${TEST_PATHS.TEST_DATA}/homePage/deviceControlSwitchesData.json`) as any;
const tempAndHumidSwitcherData = require(`${TEST_PATHS.TEST_DATA}/homePage/tempAndHumidSwitcherData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe('Device controller tests', () => {
    for (const config of SwitchersData.switchers) {
        const title = `${config.controllerName} should be switched ${config.desiredStatus}`;

        test(`${title}${config.xfail ? ' (expected failure)' : ''}`, async () => {
            const result = await pageManager.deviceControlModule.buttonControllerSwitch(
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
        test(`${mode} switch test - direct element edit`, async () => {
            const result = await pageManager.deviceControlModule.tempAndHumiditySwitch(mode as "Temperature" | "Humidity");
            expect(result).toBeTruthy();
        });
    });
});

test.describe("Temp & Humidity Switch - Mouse Movement Switch Test - Temp & Humidity", () => {
    Object.entries(tempAndHumidSwitcherData).forEach(([key, dataset]) => {
        const mode = key === "tempSwitch" ? "Temperature" : "Humidity";
        const expectedField = key === "tempSwitch" ? "expectedTemp" : "expectedHuimid";

        (dataset as any[]).forEach((entry, index) => {
            const { x, y, xfail } = entry;
            const expected = entry[expectedField];

            test(`${mode} Case ${index + 1}: offset(${x}, ${y}) → expected ${expected}`, async () => {
                const result = await pageManager.deviceControlModule.tempAndHumiditySwitch2(mode, x, y, expected);

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
        test(`should switch to "${state}" mode`, async () => {
            const result = await pageManager.deviceControlModule.acStatesSwitch(state);
            expect(result).toBeTruthy();
        });
    }
});

test.describe("Temperature On/Off Button Behavior", () => {
    ["on", "off"].forEach((state) => {
        test(`should switch temperature to "${state}"`, async () => {
            const result = await pageManager.deviceControlModule.tempSwitchOnOffButton(state as "on" | "off");
            expect(result).toBeTruthy();
        });
    });
});


