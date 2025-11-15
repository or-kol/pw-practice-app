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

test.describe(`Filter Smart Table By ID Tests`, () => {
    const dataById = smartTableData.filterById;
    dataById.forEach(({ id, expectedData }) => {
        test(`Filter table by ID: ${id}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.filterTableData("ID", id, { id, ...expectedData });
        });
    });
});

test.describe(`Filter Smart Table By First Name Tests`, () => {
    const dataByFirstName = smartTableData.filterByFirstName;
    dataByFirstName.forEach(({ firstName, expectedRowCount }) => {
        test(`Filter table by First Name: ${firstName}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.filterTableData("First Name", firstName, undefined, expectedRowCount);
        });
    });
});

test.describe(`Filter Smart Table By Last Name Tests`, () => {
    const dataByLastName = smartTableData.filterByLastName;
    dataByLastName.forEach(({ lastName, expectedRowCount }) => {
        test(`Filter table by Last Name: ${lastName}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.filterTableData("Last Name", lastName, undefined, expectedRowCount);
        });
    });
});

test.describe(`Filter Smart Table By Username Tests`, () => {
    const dataByUsername = smartTableData.filterByUsername;
    dataByUsername.forEach(({ username, expectedRowCount }) => {
        test(`Filter table by Username: ${username}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.filterTableData("Username", username, undefined, expectedRowCount);
        });
    });
});

test.describe(`Filter Smart Table By Email Tests`, () => {
    const dataByEmail = smartTableData.filterByEmail;
    dataByEmail.forEach(({ email, expectedRowCount }) => {
        test(`Filter table by Email: ${email}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.filterTableData("E-mail", email, undefined, expectedRowCount);
        });
    });
});

test.describe(`Filter Smart Table By Age Tests`, () => {
    const dataByAge = smartTableData.filterByAge;
    dataByAge.forEach(({ age, expectedRowCount }) => {
        test(`Filter table by Age: ${age}`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.smartTablePage.filterTableData("Age", age, undefined, expectedRowCount);
        });
    });
});