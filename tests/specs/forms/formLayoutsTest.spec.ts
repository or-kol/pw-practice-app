import { test } from "../../base/baseTest";
import { expect } from "@playwright/test";
import formPresets from "../../data/formData.json";
import type { FormType } from "../../types/formType";


test.beforeEach(async ({ baseTest }) => {
    await baseTest.featureMenu.navigateTo("http://localhost:4200/pages/forms/layouts");
});


test.describe("Data-driven Form Submissions", () => {
    for (const config of Object.values(formPresets) as FormType[]) {
        test(`Submit ${config.title} Form`, async ({ baseTest }) => {
            if (config.xfail) {
                test.fail(true, `${config.title} is expected to fail`);
            }

            const result = await baseTest.formLayout.submitForm(config);
            expect(result).toBe(true);
        });
    }
});


