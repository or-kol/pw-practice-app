import { test } from "../../page_objects/utils/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const dialogPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/dialogPageData.json`) as any;
const dialogs = dialogPageData.dialogs as Array<any>;
let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.dialogPage.goToDialogPage();
});

test.describe(`Validate dialog content`, () => {
    const dialogsWithBody = dialogs.filter(({ body }) => body !== undefined);
    dialogsWithBody.forEach(({ dialogNum, dialogName, header, body, xfail }) => {
        test(`test ${dialogName}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for dialog: ${dialogName}`);
            }
            await pageManager.dialogPage.dialogContentValidation(
                dialogNum, dialogName, header, body
            );
        });
    });
});

test.describe(`Dialog with component vs template`, () => {
    const dialogsData = dialogs.filter(({ dialogName }) => (dialogName === "Open Dialog with component" || dialogName === "Open Dialog with template"));
    dialogsData.forEach(({ dialogNum, dialogName, header, body, buttonText, xfail }) => {
        test(`test ${dialogName}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for dialog component/template: ${dialogName}`);
            };
            await pageManager.dialogPage.dialogComponentOrTemplate(dialogNum, dialogName, header, body, buttonText);
        });
    });
});

test.describe(`Dialog with backdrop vs without backdrop`, () => {
    const dialogsData = dialogs.filter(({ dialogName }) => dialogName.toLowerCase().includes("backdrop"));
    dialogsData.forEach(({ dialogNum, dialogName, header, body, buttonText, backdrop, xfail }) => {
        test(`test ${dialogName}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for dialog backdrop: ${dialogName}`);
            }
            await pageManager.dialogPage.dialogBackdrop(dialogNum, dialogName, header, body, buttonText, backdrop);
        });
    });
});


test.describe(`Dialog with ESC close vs ESC close`, () => {
    const dialogsData = dialogs.filter(({ dialogName }) => dialogName.toLowerCase().includes("esc close"));
    dialogsData.forEach(({ dialogNum, dialogName, header, body, buttonText, esc, xfail }) => {
        test(`test ${dialogName}`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for dialog ESC: ${dialogName}`);
            };
            await pageManager.dialogPage.dialogEscClose(
                dialogNum, dialogName, header, body, buttonText, esc
            );
        });
    });
});

test.describe(`Return result from dialog`, () => {
    const dialogResultReturn = dialogs.find(({ dialogName }) => dialogName === "Enter Name");

    test(`test Return Result From Dialog ${dialogResultReturn.approveButton} test`, async () => {
        if (dialogResultReturn.xfail) {
            test.fail(true, `Expected failure for approve button dialog`);
        };
        await pageManager.dialogPage.dialogResultReturn(
            dialogResultReturn.dialogNum, dialogResultReturn.dialogName, dialogResultReturn.header, dialogResultReturn.approveButton, dialogResultReturn.textInput
        );
    });
    
    test(`test Return Result From Dialog ${dialogResultReturn.cancelButton} test`, async () => {
        if (dialogResultReturn.xfail) {
            test.fail(true, `Expected failure for cancel button dialog`);
        };
        await pageManager.dialogPage.dialogResultReturn(
            dialogResultReturn.dialogNum, dialogResultReturn.dialogName, dialogResultReturn.header, dialogResultReturn.cancelButton, dialogResultReturn.emptyInput
        );
    });
});
