import { test, expect } from "../../base/baseTest";
import popoverPageData from "../../data/popoverPageData.json";


test.beforeEach(async ({ baseTest }) => {
    await baseTest.popoverPage.goToPopoverPage();
});


test.describe(`Popover position and content validation test suite`, () => {
    const positions = popoverPageData.popoverPosition.positions;
    const headline = popoverPageData.popoverPosition.headline;

    positions.forEach(({ position, xfail }) => {
        test(`Popover position: ${position}`, async ({ baseTest }) => {
            if (xfail) {
                test.fail(true, `Expected failure for popover position: ${position}`);
            }

            const result = await baseTest.popoverPage.popoverPositionValidation(position, headline);
            expect(result, `Expected failure for popover position: ${position}`).toBeTruthy();
        });
    });
});
