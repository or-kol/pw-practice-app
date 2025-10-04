import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const SwitchersData = require(`${TEST_PATHS.TEST_DATA}/homePage/deviceControlSwitchesData.json`);
const { variants } = SwitchersData;
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});


test.describe('Device controller tests', () => {
    const devicesSwitches = variants.buttonSwitchers;
    devicesSwitches.forEach(({ controllerName, desiredStatus }: { controllerName: string, desiredStatus: string }) => {
        const title = `${controllerName} should be switched ${desiredStatus}`;
        test(title, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.deviceControlModule.buttonControllerSwitch(controllerName, desiredStatus as 'ON' | 'OFF');
        });
    });
});

test.describe("Temp & Humidity Switch - Direct Element Edit", () => {
    const tempAndHumiditySwitch = variants.directTempAndhumidSwitches;
    tempAndHumiditySwitch.forEach((controllerName: string) => {
        test(`${controllerName} switch test - direct element edit`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.deviceControlModule.tempAndHumiditySwitch(controllerName as "Temperature" | "Humidity");
        });
    });
});

test.describe("Temp & Humidity Switch - Mouse Movement Switch Test - Temp & Humidity", () => {
    const tempAndHumiditySwitch = variants.mouseMovementTempAndhumidSwitches;
    tempAndHumiditySwitch.forEach(({ mode, x, y, expected }: { mode: string, x: number, y: number, expected: string }, index: number) => {
        test(`${mode} Case ${index + 1}: offset(${x}, ${y}) → expected ${expected}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.deviceControlModule.tempAndHumiditySwitch2(mode, x, y, expected);
        });
    });
});


test.describe("Temperature State Switching", () => {
    const temperatureStates = variants.temperatureStatesSwitchers;
    temperatureStates.forEach((state: string) => {
        test(`should switch to "${state}" mode`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.deviceControlModule.acStatesSwitch(state);
        });
    });
});


test.describe("Temperature On/Off Button Behavior", () => {
    const temperatureOnOff = variants.temperatureOnOffSwitchers;
    temperatureOnOff.forEach((state: string) => {
        test(`should switch temperature to "${state}"`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.deviceControlModule.tempSwitchOnOffButton(state);
        });
    });
});


