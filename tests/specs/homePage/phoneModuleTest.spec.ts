import { test } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const contactsData = require(`${TEST_PATHS.TEST_DATA}/homePage/phoneContactsLists.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe(`Phone module test suite`, () => {
    const contactsLists = contactsData.contactsLists;
    for (const [listName, listArr] of Object.entries(contactsLists[0])) {
        test(`${listName} list validation`, async () => {
            const hasXfail = Array.isArray(listArr) && listArr.some(contact => contact.xfail);
            if (hasXfail) {
                test.fail(true, `Expected failure for ${listName} list validation`);
            }
            const contactNames = Array.isArray(listArr) ? listArr.map(contact => contact.name) : [];
            await pageManager.phoneModule.phoneListsValidation(listName, contactNames);
        });
    }
});