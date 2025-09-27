import { test, expect } from "../../base/baseTest";
import { TEST_PATHS } from "../../config/test-config";

const formPresets = require(`${TEST_PATHS.TEST_DATA}/forms/formData.json`) as any;



test.describe("Data-driven Form Submissions", () => {
    for (const config of Object.values(formPresets) as any[]) {
        test(`Submit ${config.title} Form`, async ({ baseTest }) => {
            await baseTest.formLayouts.goToFormLayoutsPage();
            if (config.xfail) {
                test.fail(true, `${config.title} is expected to fail`);
            };
            const result = await baseTest.formLayouts.submitForm(config);
            expect(result).toBeTruthy();
        });
    };
});


