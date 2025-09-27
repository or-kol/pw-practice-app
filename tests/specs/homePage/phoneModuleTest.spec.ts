import { test, expect } from "../../base/baseTest";
import { TEST_PATHS } from "../../config/test-config";

const contactsData = require(`${TEST_PATHS.TEST_DATA}/phoneContactsLists.json`) as any;

test.describe(`Phone module test suite`, () => {
    const contactsLists = contactsData.contactsLists;
    for (const [listName, listArr] of Object.entries(contactsLists[0])) {
        test(`${listName} list validation`, async({baseTest}) => {
            const hasXfail = Array.isArray(listArr) && listArr.some(contact => contact.xfail);
            if (hasXfail) {
                test.fail(true, `Expected failure for ${listName} list validation`);
            }
            const contactNames = Array.isArray(listArr) ? listArr.map(contact => contact.name) : [];
            const result = await baseTest.phoneModule.phoneListsValidation(listName, contactNames);
            expect(result).toBeTruthy();
        });
    }
});