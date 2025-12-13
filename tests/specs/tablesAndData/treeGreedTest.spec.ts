import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const treeGridData = require(`${TEST_PATHS.TEST_DATA}/tablesAndData/treeGridData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.treeGridPage.goToTreeGridPage();
});

test.describe(`Tree Grid Search Bar Tests`, () => {
    const searchBarData = treeGridData.searchBarTests;
    searchBarData.forEach(({ Value, ExpectedRowCount }) => {
        const testTitle = `Search Tree Grid with value "${Value}" should return ${ExpectedRowCount} rows`;
        test(testTitle, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.treeGridPage.SearchTreeGridData(Value, ExpectedRowCount);
        });
    });
});

test.describe(`Tree Grid Sorting Tests`, () => {
    const sortingTests = treeGridData.sortingTests;
    sortingTests.forEach(({ Column, Direction }) => {
        const testTitle = `Sort Tree Grid by column "${Column}" in ${Direction} order`;
        test(testTitle, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.treeGridPage.sortingTreeGrid(Column, Direction === "asc" ? "ascending" : "descending");
        });
    });
});