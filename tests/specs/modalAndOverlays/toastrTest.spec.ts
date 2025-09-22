import { test, expect } from "../../base/baseTest";
import toastsPageData from "../../data/toastrPageData.json";


test.beforeEach(async ({ baseTest }) => {
    await baseTest.toastrPage.goToToastrPage();
});


test.describe(`Toastr position validation test suite`, () => {
    const toastrPositions = toastsPageData.positions;
    toastrPositions.forEach((position) => {
        test(`Toastr position: ${position.position} test`, async ({ baseTest }) => {
            if (position.xfail) {
                test.fail(true, `Expected failure for toastr position: ${position.position}`);
            };

            const result = await baseTest.toastrPage.toastPositionValidation(position.position, position.vertical, position.horizontal);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Toastr content validation test suite`, () => {
    const toastrContent = toastsPageData.TabContent;
    toastrContent.forEach((content) => {
        test(`Toastr content #${content.testNum} test`, async ({ baseTest }) => {
            if (content.xfail) {
                test.fail(true, `Expected failure for toastr content: ${content.title}`);
            };

            const result = await baseTest.toastrPage.toastrTabContentValidation(content.title, content.message);
            expect(result).toBeTruthy();
        });
    });
}); 


test.describe(`Toastr duration validation test suite`, () => {
    const toastrContent = toastsPageData.TabContent;
    toastrContent.forEach((content) => {
        test(`Toastr duration #${content.testNum} test`, async ({ baseTest }) => {
            if (content.xfail) {
                test.fail(true, `Expected failure for toastr content: ${content.title}`);
            };

            const result = await baseTest.toastrPage.toastrDurationValidation(content.timeout);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Toastr type validation test suite`, () => {
    const toastrTypes = toastsPageData.toastTypes;
    toastrTypes.forEach((type) => {
        test(`Toastr type: ${type.type} test`, async ({ baseTest }) => {
            if (type.xfail) {
                test.fail(true, `Expected failure for toastr type: ${type.type}`);
            };
            
            const result = await baseTest.toastrPage.toastTypeValidation(type.type);
            expect(result).toBeTruthy();
        });
    });
});