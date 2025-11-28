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