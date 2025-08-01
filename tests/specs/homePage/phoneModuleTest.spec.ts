import {test, expect} from "../../base/baseTest"
import contactsData from "../../data/phoneContactsLists.json"

test.describe(`Phone module test suite`, () => {
    const contactsLists = contactsData.contactsLists;
    for (const [listName, listValues] of Object.entries(contactsData.contactsLists[0])) {
        test(`${listName} list validation}`, async({baseTest}) => {
            const result = await baseTest.phoneModule.phoneListsValidation(listName, listValues);
            expect(result).toBeTruthy();
        })
    }
})