import { test } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const contactsData = require(`${TEST_PATHS.TEST_DATA}/homePage/phoneContactsLists.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe(`Phone module test suite`, () => {
    contactsData.contactsLists.forEach(({ listName, contacts, xfail }) => {
        test(`${listName} list validation`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for ${listName} list validation`);
            }
            await pageManager.phoneModule.phoneListsValidation(listName, contacts);
        });
    });
});


