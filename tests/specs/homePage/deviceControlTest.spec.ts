import { test } from "../../page_objects/utils/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const SwitchersData = require(`${TEST_PATHS.TEST_DATA}/homePage/deviceControlSwitchesData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe('Device controller tests', () => {
    const devicesSwitches = SwitchersData.buttonSwitchers;
    devicesSwitches.forEach(({ controllerName, desiredStatus, xfail }) => {
        const title = `${controllerName} should be switched ${desiredStatus}`;
        test(`${title}${xfail ? ' (expected failure)' : ''}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${controllerName} > turn ${desiredStatus}`);
            }
            await pageManager.deviceControlModule.buttonControllerSwitch(
                controllerName,
                desiredStatus as 'ON' | 'OFF'
            );
        });
    });
});

test.describe("Temp & Humidity Switch - Direct Element Edit", () => {
    const tempAndHumiditySwitch = SwitchersData.directTempAndhumidSwitches;
    tempAndHumiditySwitch.forEach(({ controllerName, xfail }) => {
        test(`${controllerName} switch test - direct element edit`, async () => {
            if (xfail) test.fail(true, `Expected failure for ${controllerName} direct element edit`);
            await pageManager.deviceControlModule.tempAndHumiditySwitch(controllerName as "Temperature" | "Humidity");
        });
    });
});

test.describe("Temp & Humidity Switch - Mouse Movement Switch Test - Temp & Humidity", () => {
    const tempAndHumiditySwitch = SwitchersData.mouseMovementTempAndhumidSwitches;
    tempAndHumiditySwitch.forEach(({ mode, x, y, expected, xfail }, index) => {
        test(`${mode} Case ${index + 1}: offset(${x}, ${y}) → expected ${expected}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${mode} offset(${x}, ${y}) → expected ${expected}`);
            }
            await pageManager.deviceControlModule.tempAndHumiditySwitch2(mode, x, y, expected);
        });
    });
});


test.describe("Temperature State Switching", () => {
    const temperatureStates = SwitchersData.temperatureStatesSwitchers;
    temperatureStates.forEach(({ state, xfail }) => {
        test(`should switch to "${state}" mode`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for state: ${state}`);
            };
            await pageManager.deviceControlModule.acStatesSwitch(state);
        });
    });
});


test.describe("Temperature On/Off Button Behavior", () => {
    const temperatureOnOff = SwitchersData.temperatureOnOffSwitchers;
    temperatureOnOff.forEach(({ state, xfail }) => {
        test(`should switch temperature to "${state}"`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for temperature on/off: ${state}`);
            };
            await pageManager.deviceControlModule.tempSwitchOnOffButton(state);
        });
    });
});


