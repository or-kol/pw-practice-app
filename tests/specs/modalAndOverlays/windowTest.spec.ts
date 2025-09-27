import {test, expect} from "../../base/baseTest"
import { TEST_PATHS } from "../../config/test-config";

const windowPageData = require(`${TEST_PATHS.TEST_DATA}/windowPageData.json`) as any;

const WINDOWS = Object.values(windowPageData.windows) as any[];

test.beforeEach(async ({ baseTest }) => {
    await baseTest.windowPage.goToWindowPage();
});

test.describe(`Window page header verification`, () => {
    const headers = Object.values(windowPageData.headers) as any[];

    headers.forEach((header) => {
        test(`Verify ${header.name} window page header`, async ({ baseTest }) => {
            if (header.xfail) {
                test.fail(true, `Expected failure for header: ${header.name}`);
            }
            const result = await baseTest.windowPage.verifyWindowPageHeaders(header.name);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Verify window content test suite`, () => {
    WINDOWS.forEach((window) => {
        test(`Verify ${window.windowName} window content}`, async ({ baseTest }) => {
            if (window.xfail) {
                test.fail(true, `Expected failure for window content: ${window.windowName}`);
            }
            const result = await baseTest.windowPage.verifyWindowContent(window.windowName, window.header, window.body);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Close window with ESC test suite`, () => {
    WINDOWS.forEach((window) => {
        test(`Close ${window.windowName} window with ESC}`, async ({ baseTest }) => {
            if (window.xfail) {
                test.fail(true, `Expected failure for ESC close: ${window.windowName}`);
            }
            const result = await baseTest.windowPage.closeWindowWithEsc(window.windowName, window.closeEsc);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Close window with backdrop test suite`, () => {
    WINDOWS.forEach((window) => {
        test(`Close ${window.windowName} window with backdrop}`, async ({ baseTest }) => {
            if (window.xfail) {
                test.fail(true, `Expected failure for backdrop close: ${window.windowName}`);
            }
            const result = await baseTest.windowPage.closeWindowWithBackdrop(window.windowName, window.closeBackdrop);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Minimize window test suite`, () => {
    WINDOWS.forEach((window) => {
        test(`Minimize ${window.windowName} window}`, async ({ baseTest }) => {
            if (window.xfail) {
                test.fail(true, `Expected failure for minimize: ${window.windowName}`);
            }
            const result = await baseTest.windowPage.minimizeWindowButtonFunctionality(window.windowName);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Colapse window test suite`, () => {
    const windowStatus = windowPageData.windowStatus;

    WINDOWS.forEach((window) => {
        test(`Colapse ${window.windowName} window}`, async ({ baseTest }) => {
            if (window.xfail) {
                test.fail(true, `Expected failure for collapse: ${window.windowName}`);
            }
            const result = await baseTest.windowPage.colapseWindowButtonFunctionality(window.windowName, windowStatus.collapsed, windowStatus.expended);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Close window with close button test suite`, () => {
    WINDOWS.forEach((window) => {
        test(`Close ${window.windowName} window with close button}`, async ({ baseTest }) => {
            if (window.xfail) {
                test.fail(true, `Expected failure for close button: ${window.windowName}`);
            }
            const result = await baseTest.windowPage.closeWindowWithCloseButton(window.windowName);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Open window form texboxes activaition test suite`, () => {
    const window = windowPageData.windows.openWindowForm;
    const Textboxes = [window.subject, window.text];

    Textboxes.forEach((Textbox) => {
        test(`${Textbox} activaion}`, async ({ baseTest }) => {
            if (window.xfail) {
                test.fail(true, `Expected failure for textbox activation: ${Textbox}`);
            }
            const result = await baseTest.windowPage.isOpenWindowformTextBoxesActive(window.windowName, Textbox, window.activeTextbox);
            expect(result).toBeTruthy();
        });
    });
});