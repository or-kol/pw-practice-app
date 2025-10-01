import { test } from "../../base/browserSetup"
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const securityCamerasData = require(`${TEST_PATHS.TEST_DATA}/homePage/securityCameraData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe(`Security cameras layout test suite`, () => {
    [`grid`, `single`].forEach((view) => {
        test(`Check ${view} view button`, async () => {
            await pageManager.securityCameras.layoutViewButton(view);
        });
    });
});

test.describe(`Security Camera selection from grid view`, () => {
    securityCamerasData.cameraNames.forEach((camera) => {
        test(`Check camera selection from grid view: ${camera.name}`, async () => {
            if (camera.xfail) {
                test.fail(true, `Expected failure for camera selection: ${camera.name}`);
            };
            await pageManager.securityCameras.chooseCameraFromGrid(camera.name);
        });
    });
});

test.describe(`Scurity Cameras control panel buttons visibility test suite`, () => {
    securityCamerasData.controlButtonNames.forEach((button) => {
        test(`check ${button.name} button Visibility`, async() => {
            if (button.xfail) {
                test.fail(true, `Expected failure for control panel button: ${button.name}`);
            };
            await pageManager.securityCameras.controlPanelButonVisibility(button.name);
        });
    });
});