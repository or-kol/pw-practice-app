import {test, expect} from "../../base/baseTest"
import windowPageData from "../../data/windowPageData.json"


// Reusable constant
const WINDOWS = Object.values(windowPageData.windows);


test.beforeEach(async ({baseTest}) => {
    await baseTest.windowPage.goToWindowPage();
});


test.describe(`Window page header verification`, () => {
    const headers = Object.values(windowPageData.headers);

    headers.forEach((header) => {
        test(`Verify ${header} window page header`, async ({baseTest}) => {
            const result = await baseTest.windowPage.verifyWindowPageHeaders(header);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Verify window content test suite`, () => {
    WINDOWS.forEach((window) => {
        test(`Verify ${window.windowName} window content}`, async ({baseTest}) => {
            const result = await baseTest.windowPage.verifyWindowContent(window.windowName, window.header, window.body);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Close window with ESC test suite`, () => {
    WINDOWS.forEach((window) => {
        test(`Close ${window.windowName} window with ESC}`, async ({baseTest}) => {
            const result = await baseTest.windowPage.closeWindowWithEsc(window.windowName, window.closeEsc);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Close window with backdrop test suite`, () => {
    WINDOWS.forEach((window) => {
        test(`Close ${window.windowName} window with backdrop}`, async ({baseTest}) => {
            const result = await baseTest.windowPage.closeWindowWithBackdrop(window.windowName, window.closeBackdrop);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Minimize window test suite`, () => {
    WINDOWS.forEach((window) => {
        test(`Minimize ${window.windowName} window}`, async ({baseTest}) => {
            const result = await baseTest.windowPage.minimizeWindowButtonFunctionality(window.windowName);
            expect(result).toBeTruthy();
        });
    });
});

test.describe(`Colapse window test suite`, () => {
    const windowStatus = windowPageData.windowStatus;

    WINDOWS.forEach((window) => {
        test(`Colapse ${window.windowName} window}`, async ({baseTest}) => {
            const result = await baseTest.windowPage.colapseWindowButtonFunctionality(window.windowName, windowStatus.collapsed, windowStatus.expended);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Close window with close button test suite`, () => {
    WINDOWS.forEach((window) => {
        test(`Close ${window.windowName} window with close button}`, async ({baseTest}) => {
            const result = await baseTest.windowPage.closeWindowWithCloseButton(window.windowName);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Open window form texboxes activaition test suite`, () => {
    const window = windowPageData.windows.openWindowForm;
    const Textboxes = [window.subject, window.text];

    Textboxes.forEach((Textbox) => {
        test(`${Textbox} activaion}`, async ({baseTest}) => {
            const result = await baseTest.windowPage.isOpenWindowformTextBoxesActive(window.windowName, Textbox, window.activeTextbox);
            expect(result).toBeTruthy();
        });
    });
});