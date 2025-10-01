import { test } from "../../base/browserSetup"
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const dialogPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/dialogPageData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.dialogPage.goToDialogPage();
});

test.describe(`Validate dialog content`, () => {
    const dialogdata = dialogPageData;

    (Object.values(dialogdata) as any[]).filter((dataSet) => 'body' in dataSet).forEach((dataSet) => {
        test(`test ${dataSet.dialogName}`, async () => {
            if (dataSet.xfail) {
                test.fail(true, `Expected failure for dialog: ${dataSet.dialogName}`);
            }
            await pageManager.dialogPage.dialogContentValidation(
                dataSet.dialogNum, dataSet.dialogName, dataSet.header, dataSet.body
            );
        });
    }); 
});

test.describe(`Dialog with component vs template`, () => {
    const dialogTypeList = [dialogPageData.openDialogWithComponent, dialogPageData.openDialogWithTemplate];

    dialogTypeList.forEach ((dataSet) => {
        test(`test ${dataSet.dialogName}`, async () => {
            if (dataSet.xfail) {
                test.fail(true, `Expected failure for dialog component/template: ${dataSet.dialogName}`);
            }
            await pageManager.dialogPage.dialogComponentOrTemplate(
                dataSet.dialogNum, dataSet.dialogName, dataSet.header, dataSet.body, dataSet.buttonText
            );
        });
    });
});

test.describe(`Dialog with backdrop vs without backdrop`, () => {
    const backdropElementList = [
        dialogPageData.openDialogWithBackdrop,
        dialogPageData.openDialogWithoutBackdrop, 
        dialogPageData.openDialogWithBackdropClick,
        dialogPageData.openDialogWithoutBackdropClick
    ];

    backdropElementList.forEach ((dataSet) => {
        test(`test ${dataSet.dialogName}`, async () => {
            if (dataSet.xfail) {
                test.fail(true, `Expected failure for dialog backdrop: ${dataSet.dialogName}`);
            }
            await pageManager.dialogPage.dialogBackdrop(
                dataSet.dialogNum, dataSet.dialogName, dataSet.header, dataSet.body, dataSet.buttonText, dataSet.backdrop
            );
        });
    });
});

test.describe(`Dialog with ESC close vs ESC close`, () => {
    const dialogEscElementList = [
        dialogPageData.openDialogWithEscClose,
        dialogPageData.openDialogWithoutEscClose
    ];

    dialogEscElementList.forEach ((dataSet) => {
        test(`test ${dataSet.dialogName}`, async () => {
            if (dataSet.xfail) {
                test.fail(true, `Expected failure for dialog ESC: ${dataSet.dialogName}`);
            }
            await pageManager.dialogPage.dialogEscClose(
                dataSet.dialogNum, dataSet.dialogName, dataSet.header, dataSet.body, dataSet.buttonText, dataSet.esc
            );
        });
    });
});

test.describe(`Return result from dialog`, () => {
    const dialogResultReturn = dialogPageData.returnResultFromDialog;

    test(`test Return Result From Dialog ${dialogResultReturn.approveButton} test`, async () => {
        if (dialogResultReturn.xfail) {
            test.fail(true, `Expected failure for approve button dialog`);
        }
        await pageManager.dialogPage.dialogResultReturn(
            dialogResultReturn.dialogNum, dialogResultReturn.dialogName, dialogResultReturn.header, dialogResultReturn.approveButton, dialogResultReturn.textInput
        );
    });

    test(`test Return Result From Dialog ${dialogResultReturn.cancelButton} test`, async () => {
        if (dialogResultReturn.xfail) {
            test.fail(true, `Expected failure for cancel button dialog`);
        }
        await pageManager.dialogPage.dialogResultReturn(
            dialogResultReturn.dialogNum, dialogResultReturn.dialogName, dialogResultReturn.header, dialogResultReturn.cancelButton, dialogResultReturn.emptyInput
        );
    });
});