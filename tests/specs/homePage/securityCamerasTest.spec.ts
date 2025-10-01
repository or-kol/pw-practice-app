import { test } from "../../base/browserSetup"
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const securityCamerasData = require(`${TEST_PATHS.TEST_DATA}/homePage/securityCameraData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});


test.describe(`Security cameras layout test suite`, () => {
    const layoutViews = securityCamerasData.layoutViews;
    layoutViews.forEach(({ view }) => {
        test(`Check ${view} view button`, async () => {
            await pageManager.securityCameras.layoutViewButton(view);
        });
    });
});

test.describe(`Security Camera selection from grid view`, () => {
    const cameraNames = securityCamerasData.cameraNames;
    cameraNames.forEach(({ name, xfail }) => {
        test(`Check camera selection from grid view: ${name}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for camera selection: ${name}`);
            };
            await pageManager.securityCameras.chooseCameraFromGrid(name);
        });
    });
});

test.describe(`Scurity Cameras control panel buttons visibility test suite`, () => {
    const controlButtonNames = securityCamerasData.controlButtonNames;
    controlButtonNames.forEach(({ name, xfail }) => {
        test(`check ${name} button Visibility`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for control panel button: ${name}`);
            };
            await pageManager.securityCameras.controlPanelButonVisibility(name);
        });
    });
});