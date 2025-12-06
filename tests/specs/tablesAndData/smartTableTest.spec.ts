import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const smartTableData = require(`${TEST_PATHS.TEST_DATA}/tablesAndData/smartTableData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.smartTablePage.goToSmartTablePage();
});

test.describe(`Filter Smart Table Tests`, () => {
    const filterTests = smartTableData.filterTests;
    filterTests.forEach(({ field, value, behaviour, expectEmpty }) => {
        test(`Filter ${field} by "${value}" (${behaviour})`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.filterTableData(field, value, behaviour, expectEmpty);
        });
    });
});

test.describe(`Sort Smart Table Tests`, () => {
    const sortTests = smartTableData.sortTests;

    sortTests.forEach(({ field }) => {
        test(`Sort by ${field} Ascending Order Test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.sortTableByColumn(field, 'ascending');
        });
    });

    sortTests.forEach(({ field }) => {
        test(`Sort by ${field} Descending Order Test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.sortTableByColumn(field, 'descending');
        });
    });
});


test.describe(`Smart Table Pagination Tests`, () => {
    test(`Go to Last Page Test`, async ({}, testInfo) => {
        handleXfail(testInfo, specFile);
        await pageManager.smartTablePage.goToLastPageButton();
    });

    test(`Go to First Page Test`, async ({}, testInfo) => {
        handleXfail(testInfo, specFile);
        await pageManager.smartTablePage.goToFirstPageButton();
    });

    test.describe(`Go to Specific Page Test`,  () => {
        const specificPageNumbers = smartTableData.paginationTests;

        specificPageNumbers.forEach(({ pageNumber }) => {
            test(`Go to Page Number ${pageNumber} Test`, async ({}, testInfo) => {
                handleXfail(testInfo, specFile);
                await pageManager.smartTablePage.goToSpecificPage(pageNumber);
            });
        });
    });
});


test.describe(`Smart Table Add Row Tests`, () => {
    const inputNewRowData = smartTableData.inputNewRowsTests;
    inputNewRowData.forEach(({ case: testCase, data: rowData, expectedToFail }) => {
        test(`Add New Row - ${testCase}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.addRowToTable(rowData, expectedToFail);
        });
    });

    test(`Decline New Row Addition Test`, async ({}, testInfo) => {
        handleXfail(testInfo, specFile);
        await pageManager.smartTablePage.declineRowAddition();
    });
});

test.describe(`Smart Table Edit Row Tests`, () => {
    const editRowData = smartTableData.editTableDataTests;
    editRowData.forEach(({ case: testCase, rowIndex, column, newValue, expectedToFail }) => {
        test(`Edit Row - ${testCase}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.editRowInTable(rowIndex, { [column]: newValue }, expectedToFail);
        });
    });

    const declineEditRowData = smartTableData.rowIndexesToDeclineEdit;
    declineEditRowData.forEach((rowIndex: number) => {
        test(`Decline Edit Row - ${rowIndex}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.declineRowEdit(rowIndex);
        });
    });
});


test.describe(`Smart Table Delete Row Tests`, () => {
    const deleteRowData = smartTableData.rowIndexesToDeleteRow;
    deleteRowData.forEach(({ rowIndex, confirm }) => {
        test(`Delete Row - ${rowIndex} - ${confirm ? 'Approve' : 'Cancel'}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.deleteRowFromTable(rowIndex, confirm);
        });
    });
});
