import {test, expect} from "../../base/baseTest"
import securityCamerasData from "../../data/securityCameraData.json"

test.describe(`Security cameras layout test suite`, () => {
    [`grid`, `single`].forEach((view) => {
        test(`Check ${view} view button`, async ({baseTest}) => {
            const result = await baseTest.securityCameras.layoutViewButton(view);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Security Camera selection from grid view`, () => {
    securityCamerasData.cameraNames.forEach((camera) => {
        test(`Check camera selection from grid view: ${camera.name}`, async ({baseTest}) => {
            if (camera.xfail) {
                test.fail(true, `Expected failure for camera selection: ${camera.name}`);
            };
            const result = await baseTest.securityCameras.chooseCameraFromGrid(camera.name);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Scurity Cameras control panel buttons visibility test suite`, () => {
    securityCamerasData.controlButtonNames.forEach((button) => {
        test(`check ${button.name} button Visibility`, async({baseTest}) => {
            if (button.xfail) {
                test.fail(true, `Expected failure for control panel button: ${button.name}`);
            };
            const result = await baseTest.securityCameras.controlPanelButonVisibility(button.name);
            expect(result).toBeTruthy();
        });
    });
});