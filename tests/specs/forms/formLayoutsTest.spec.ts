import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const formPresets = require(`${TEST_PATHS.TEST_DATA}/forms/formData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.formLayoutsPage.goToFormLayoutsPage();
});


test.describe("Data-driven Form Submissions", () => {
    const forms = formPresets.forms;
    forms.forEach(({ title, ...rest }) => {
        test(`Submit ${title} Form`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.formLayoutsPage.submitForm({ title, ...rest });
        });
    });
});


