import { test, expect } from "../../base/baseTest";
import formPresets from "../../data/formData.json";
import type { FormType } from "../../types/formType";


test.describe("Data-driven Form Submissions", () => {
    for (const config of Object.values(formPresets) as FormType[]) {
        test(`Submit ${config.title} Form`, async ({ baseTest }) => {
            await baseTest.formLayouts.goToFormLayoutsPage();
            if (config.xfail) {
                test.fail(true, `${config.title} is expected to fail`);
            }

            const result = await baseTest.formLayouts.submitForm(config);
            expect(result).toBe(true);
        });
    }
});


