import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../page_objects/pageManager";
import path from "path";

const dialogPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/dialogPageData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.dialogPage.goToDialogPage();
});


test.describe(`Validate dialog content`, () => {
    const dialogsWithBody = dialogPageData.dialogs.filter(({ body }) => body !== undefined);
    dialogsWithBody.forEach(({ dialogNum, dialogName, header, body }) => {
        test(`test ${dialogName}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.dialogPage.dialogContentValidation(
                dialogNum, dialogName, header, body
            );
        });
    });
});

test.describe(`Dialog with component vs template`, () => {
    const dialogsData = dialogPageData.dialogs.filter(({ dialogName }) => (dialogName === "Open Dialog with component" || dialogName === "Open Dialog with template"));
    dialogsData.forEach(({ dialogNum, dialogName, header, body, buttonText }) => {
        test(`test ${dialogName}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.dialogPage.dialogComponentOrTemplate(dialogNum, dialogName, header, body, buttonText);
        });
    });
});

test.describe(`Dialog with backdrop vs without backdrop`, () => {
    const dialogsData = dialogPageData.dialogs.filter(({ dialogName }) => dialogName.toLowerCase().includes("backdrop"));
    dialogsData.forEach(({ dialogNum, dialogName, header, body, buttonText, backdrop }) => {
        test(`test ${dialogName}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.dialogPage.dialogBackdrop(dialogNum, dialogName, header, body, buttonText, backdrop);
        });
    });
});


test.describe(`Dialog with ESC close vs ESC close`, () => {
    const dialogsData = dialogPageData.dialogs.filter(({ dialogName }) => dialogName.toLowerCase().includes("esc close"));
    dialogsData.forEach(({ dialogNum, dialogName, header, body, buttonText, esc }) => {
        test(`test ${dialogName}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.dialogPage.dialogEscClose(
                dialogNum, dialogName, header, body, buttonText, esc
            );
        });
    });
});

test.describe(`Return result from dialog`, () => {
    const dialogResultReturn = dialogPageData.dialogs.find(({ dialogName }) => dialogName === "Enter Name");

    test(`test Return Result From Dialog ${dialogResultReturn.approveButton} test`, async ({}, testInfo) => {
        handleXfail(testInfo, specFile);
        await pageManager.dialogPage.dialogResultReturn(
            dialogResultReturn.dialogNum, dialogResultReturn.dialogName, dialogResultReturn.header, dialogResultReturn.approveButton, dialogResultReturn.textInput);
    });
    
    test(`test Return Result From Dialog ${dialogResultReturn.cancelButton} test`, async ({}, testInfo) => {
        handleXfail(testInfo, specFile);
        await pageManager.dialogPage.dialogResultReturn(
            dialogResultReturn.dialogNum, dialogResultReturn.dialogName, dialogResultReturn.header, dialogResultReturn.cancelButton, dialogResultReturn.emptyInput);
    });
});
