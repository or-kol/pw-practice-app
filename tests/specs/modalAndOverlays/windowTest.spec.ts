import { test } from "../../page_objects/utils/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";


const windowPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/windowPageData.json`) as any;
const { windows, headers, windowStatus } = windowPageData;
const WINDOWS = windows;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.windowPage.goToWindowPage();
});


test.describe(`Window page header verification`, () => {
    headers.forEach(({ name, xfail }) => {
        test(`Verify ${name} window page header`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${name}`);
            };
            await pageManager.windowPage.verifyWindowPageHeaders(name);
        });
    });
});

test.describe(`Window content verification`, () => {
    WINDOWS.forEach(({ windowName, header, body, xfail }) => {
        test(`Verify ${windowName} window content`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${windowName}`);
            };
            await pageManager.windowPage.verifyWindowContent(windowName, header, body);
        });
    });
});

test.describe(`Window ESC close functionality`, () => {
    WINDOWS.forEach(({ windowName, closeEsc, xfail }) => {
        test(`Close ${windowName} window with ESC`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${windowName}`);
            };
            await pageManager.windowPage.closeWindowWithEsc(windowName, closeEsc);
        });
    });
});

test.describe(`Window backdrop close functionality`, () => {
    WINDOWS.forEach(({ windowName, closeBackdrop, xfail }) => {
        test(`Close ${windowName} window with backdrop`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${windowName}`);
            };
            await pageManager.windowPage.closeWindowWithBackdrop(windowName, closeBackdrop);
        });
    });
});

test.describe(`Window minimize functionality`, () => {
    WINDOWS.forEach(({ windowName, xfail }) => {
        test(`Minimize ${windowName} window`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${windowName}`);
            };
            await pageManager.windowPage.minimizeWindowButtonFunctionality(windowName);
        });
    });
});

test.describe(`Window collapse functionality`, () => {
    WINDOWS.forEach(({ windowName, xfail }) => {
        test(`Collapse ${windowName} window`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${windowName}`);
            };
            await pageManager.windowPage.colapseWindowButtonFunctionality(windowName, windowStatus.collapsed, windowStatus.expanded);
        });
    });
});

test.describe(`Window close button functionality`, () => {
    WINDOWS.forEach(({ windowName, xfail }) => {
        test(`Close ${windowName} window with close button`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${windowName}`);
            };
            await pageManager.windowPage.closeWindowWithCloseButton(windowName);
        });
    });
});

test.describe(`Textbox activation`, () => {
    const openWindowForm = WINDOWS.find(window => window.windowName === "Open window form");
    [openWindowForm.subject, openWindowForm.text].forEach((textbox) => {
        test(`${textbox} activation`, async () => {
            await pageManager.windowPage.isOpenWindowformTextBoxesActive(openWindowForm.windowName, textbox, openWindowForm.activeTextbox);
        });
    });
});