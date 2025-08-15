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
    securityCamerasData.cameraNames.forEach((cameraName) => {
        test(`Check camera selection from grid view: ${cameraName}`, async ({baseTest}) => {
            const result = await baseTest.securityCameras.chooseCameraFromGrid(cameraName);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Scurity Cameras control panel buttons visibility test suite`, () => {
    securityCamerasData.controlButtonNames.forEach((buttonName) => {
        test(`check ${buttonName} button Visibility`, async({baseTest}) => {
            const result = await baseTest.securityCameras.controlPanelButonVisibility(buttonName);
            expect(result).toBeTruthy();
        });
    });
});