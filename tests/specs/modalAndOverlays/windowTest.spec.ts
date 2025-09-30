import { test, expect } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const windowPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/windowPageData.json`) as any;

const WINDOWS = Object.values(windowPageData.windows) as any[];

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.windowPage.goToWindowPage();
});

test.describe(`Window page header verification`, () => {
    const headers = Object.values(windowPageData.headers) as any[];

    headers.forEach((header) => {
        test(`Verify ${header.name} window page header`, async () => {
            if (header.xfail) {
                test.fail(true, `Expected failure for ${header.name}`);
            }
            const result = await pageManager.windowPage.verifyWindowPageHeaders(header.name);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Window content verification`, () => {
    WINDOWS.forEach((window) => {
        test(`Verify ${window.windowName} window content`, async () => {
            if (window.xfail) {
                test.fail(true, `Expected failure for ${window.windowName}`);
            }
            const result = await pageManager.windowPage.verifyWindowContent(window.windowName, window.header, window.body);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Window ESC close functionality`, () => {
    WINDOWS.forEach((window) => {
        test(`Close ${window.windowName} window with ESC`, async () => {
            if (window.xfail) {
                test.fail(true, `Expected failure for ${window.windowName}`);
            }
            const result = await pageManager.windowPage.closeWindowWithEsc(window.windowName, window.closeEsc);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Window backdrop close functionality`, () => {
    WINDOWS.forEach((window) => {
        test(`Close ${window.windowName} window with backdrop`, async () => {
            if (window.xfail) {
                test.fail(true, `Expected failure for ${window.windowName}`);
            }
            const result = await pageManager.windowPage.closeWindowWithBackdrop(window.windowName, window.closeBackdrop);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Window minimize functionality`, () => {
    WINDOWS.forEach((window) => {
        test(`Minimize ${window.windowName} window`, async () => {
            if (window.xfail) {
                test.fail(true, `Expected failure for ${window.windowName}`);
            }
            const result = await pageManager.windowPage.minimizeWindowButtonFunctionality(window.windowName);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Window collapse functionality`, () => {
    WINDOWS.forEach((window) => {
        test(`Collapse ${window.windowName} window`, async () => {
            if (window.xfail) {
                test.fail(true, `Expected failure for ${window.windowName}`);
            }
            const result = await pageManager.windowPage.colapseWindowButtonFunctionality(
                window.windowName, 
                windowPageData.windowStatus.collapsed, 
                windowPageData.windowStatus.expended
            );
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Window close button functionality`, () => {
    WINDOWS.forEach((window) => {
        test(`Close ${window.windowName} window with close button`, async () => {
            if (window.xfail) {
                test.fail(true, `Expected failure for ${window.windowName}`);
            }
            const result = await pageManager.windowPage.closeWindowWithCloseButton(window.windowName);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Textbox activation`, () => {
    const window = windowPageData.windows.openWindowForm;
    const textboxNames = [window.subject, window.text];
    
    textboxNames.forEach((Textbox) => {
        test(`${Textbox} activation`, async () => {
            const result = await pageManager.windowPage.isOpenWindowformTextBoxesActive(
                window.windowName, 
                Textbox, 
                window.activeTextbox
            );
            expect(result).toBeTruthy();
        });
    });
});