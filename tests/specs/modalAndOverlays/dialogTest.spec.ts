import {test, expect} from "../../base/baseTest"
import dialogPageData from "../../data/dialogPageData.json"


test.beforeEach(async ({baseTest}) => {
    await baseTest.dialogPage.goToDialogPage();
});


test.describe(`Validate dialog content`, () => {
    const dialogdata = dialogPageData;

    Object.values(dialogdata).filter((dataSet) => 'body' in dataSet).forEach((dataSet) => {
            test(`test ${dataSet.dialogName}`, async ({baseTest}) => {
                const result = await baseTest.dialogPage.dialogContentValidation(dataSet.dialogNum, dataSet.dialogName, dataSet.header, dataSet.body);
                expect(result).toBeTruthy();
            });
        }); 
})


test.describe(`Dialog with component vs template`, () => {
    const dialogTypeList = [dialogPageData.openDialogWithComponent, dialogPageData.openDialogWithTemplate];

    dialogTypeList.forEach ((dataSet) => {
        test(`test ${dataSet.dialogName}`, async ({baseTest}) => {
            const result = await baseTest.dialogPage.dialogComponentOrTemplate(
                dataSet.dialogNum, dataSet.dialogName, dataSet.header, dataSet.body, dataSet.buttonText);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Dialog with backdrop vs without backdrop`, () => {
    const backdropElementList = [dialogPageData.openDialogWithBackdrop, dialogPageData.openDialogWithoutBackdrop, 
        dialogPageData.openDialogWithBackdropClick, dialogPageData.openDialogWithoutBackdropClick];

    backdropElementList.forEach ((dataSet) => {
        test(`test ${dataSet.dialogName}`, async ({baseTest}) => {
            const result = await baseTest.dialogPage.dialogBackdrop(
                dataSet.dialogNum, dataSet.dialogName, dataSet.header, dataSet.body, dataSet.buttonText, dataSet.backdrop);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Dialog with ESC close vs ESC close`, () => {
    const dialogEscElementList = [dialogPageData.openDialogWithEscClose, dialogPageData.openDialogWithoutEscClose];

    dialogEscElementList.forEach ((dataSet) => {
        test(`test ${dataSet.dialogName}`, async ({baseTest}) => {
            const result = await baseTest.dialogPage.dialogEscClose(
                dataSet.dialogNum, dataSet.dialogName, dataSet.header, dataSet.body, dataSet.buttonText, dataSet.esc);
            expect(result).toBeTruthy();
        });
    });
});


test.describe(`Return result from dialog`, () => {
    const dialogResultReturn = dialogPageData.returnResultFromDialog;

    test(`test Return Result From Dialog ${dialogResultReturn.approveButton} test`, async ({baseTest}) => {
        const result = await baseTest.dialogPage.dialogResultReturn(
            dialogResultReturn.dialogNum, dialogResultReturn.dialogName, dialogResultReturn.header, dialogResultReturn.approveButton, dialogResultReturn.textInput);
        expect(result).toBeTruthy();
    });

    test(`test Return Result From Dialog ${dialogResultReturn.cancelButton} test`, async ({baseTest}) => {
        const result = await baseTest.dialogPage.dialogResultReturn(
            dialogResultReturn.dialogNum, dialogResultReturn.dialogName, dialogResultReturn.header, dialogResultReturn.cancelButton, dialogResultReturn.emptyInput);
        expect(result).toBeTruthy();
    });
});