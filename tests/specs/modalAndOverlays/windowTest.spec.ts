import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const windowPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/windowPageData.json`);
const { windows, headers, variants } = windowPageData;
const WINDOWS = windows;
const windowStatus = variants.windowStatus;
const specFile = path.basename(__filename, ".spec.ts");
let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.windowPage.goToWindowPage();
});


test.describe(`Window page header verification`, () => {
    headers.forEach((header: string) => {
        test(`Verify ${header} window page header`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.windowPage.verifyWindowPageHeaders(header);
        });
    });
});

test.describe(`Window content verification`, () => {
    WINDOWS.forEach(({ windowName, header, body }) => {
        test(`Verify ${windowName} window content`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.windowPage.verifyWindowContent(windowName, header, body);
        });
    });
});

test.describe(`Window ESC close functionality`, () => {
    WINDOWS.forEach(({ windowName, closeEsc }) => {
        test(`Close ${windowName} window with ESC`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.windowPage.closeWindowWithEsc(windowName, closeEsc);
        });
    });
});

test.describe(`Window backdrop close functionality`, () => {
    WINDOWS.forEach(({ windowName, closeBackdrop }) => {
        test(`Close ${windowName} window with backdrop`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.windowPage.closeWindowWithBackdrop(windowName, closeBackdrop);
        });
    });
});

test.describe(`Window minimize functionality`, () => {
    WINDOWS.forEach(({ windowName }) => {
        test(`Minimize ${windowName} window`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.windowPage.minimizeWindowButtonFunctionality(windowName);
        });
    });
});

test.describe(`Window collapse functionality`, () => {
    WINDOWS.forEach(({ windowName }) => {
        test(`Collapse ${windowName} window`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.windowPage.colapseWindowButtonFunctionality(windowName, windowStatus.collapsed, windowStatus.expanded);
        });
    });
});

test.describe(`Window close button functionality`, () => {
    WINDOWS.forEach(({ windowName }) => {
        test(`Close ${windowName} window with close button`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.windowPage.closeWindowWithCloseButton(windowName);
        });
    });
});

test.describe(`Textbox activation`, () => {
    const openWindowForm = WINDOWS.find(window => window.windowName === "Open window form");
    [openWindowForm.subject, openWindowForm.text].forEach((textbox) => {
        test(`${textbox} activation`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.windowPage.isOpenWindowformTextBoxesActive(openWindowForm.windowName, textbox, openWindowForm.activeTextbox);
        });
    });
});