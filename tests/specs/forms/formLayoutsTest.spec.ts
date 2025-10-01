import { test } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const formPresets = require(`${TEST_PATHS.TEST_DATA}/forms/formData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe("Data-driven Form Submissions", () => {
    formPresets.forEach(({ title, xfail, ...rest }) => {
        test(`Submit ${title} Form`, async () => {
            await pageManager.formLayoutsPage.goToFormLayoutsPage();
            if (xfail) {
                test.fail(true, `${title} is expected to fail`);
            };
            await pageManager.formLayoutsPage.submitForm({ title, xfail, ...rest });
        });
    });
});


