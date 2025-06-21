
import { test as base } from "@playwright/test";
import { FeatursMenuPage } from "../page_objects/featuresMenuPage";
import { FormLayoutsPage } from "../page_objects/formLayoutsPage";


type TestFixtures = {
    baseTest: {
        featureMenu: FeatursMenuPage;
        formLayout: FormLayoutsPage;
    };
};


export const test = base.extend<TestFixtures>({
    baseTest: async ({ page }, use) => {
        const featureMenu = new FeatursMenuPage(page);
        const formLayout = new FormLayoutsPage(page);
        await use({ featureMenu, formLayout });
    },
});