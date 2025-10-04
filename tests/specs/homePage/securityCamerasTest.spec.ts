import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const securityCamerasData = require(`${TEST_PATHS.TEST_DATA}/homePage/securityCameraData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});


test.describe(`Security cameras layout test suite`, () => {
    const layoutViews = securityCamerasData.layoutViews;
    layoutViews.forEach((view: string) => {
        test(`Check ${view} view button`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.securityCameras.layoutViewButton(view);
        });
    });
});

test.describe(`Security Camera selection from grid view`, () => {
    const cameraNames = securityCamerasData.cameraNames;
    cameraNames.forEach((name: string) => {
        test(`Check camera selection from grid view: ${name}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.securityCameras.chooseCameraFromGrid(name);
        });
    });
});

test.describe(`Scurity Cameras control panel buttons visibility test suite`, () => {
    const controlButtonNames = securityCamerasData.controlButtonNames;
    controlButtonNames.forEach((name: string) => {
        test(`check ${name} button Visibility`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.securityCameras.controlPanelButonVisibility(name);
        });
    });
});