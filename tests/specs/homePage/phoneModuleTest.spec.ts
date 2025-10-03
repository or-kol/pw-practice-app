import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../page_objects/pageManager";
import path from "path";

const contactsData = require(`${TEST_PATHS.TEST_DATA}/homePage/phoneContactsLists.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});


test.describe(`Phone module test suite`, () => {
    contactsData.contactsLists.forEach(({ listName, contacts }) => {
        test(`${listName} list validation`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.phoneModule.phoneListsValidation(listName, contacts);
        });
    });
});


