import { test as base } from "@playwright/test";
import { FeatursMenuPage } from "../page_objects/featuresMenuNavigationArea";
import { FormLayoutsPage } from "../page_objects/formLayoutsPage";
import { DatepickerPage } from "../page_objects/datepickerPage";
import { TopbarPage } from "../page_objects/topBarPage";

type TestFixtures = {
    baseTest: {
        featureMenu: FeatursMenuPage;
        formLayout: FormLayoutsPage;
        datepickerPage: DatepickerPage;
        topbarPage: TopbarPage;
    };
};

export const test = base.extend<TestFixtures>({
    baseTest: async ({ page }, use) => {
        const featureMenu = new FeatursMenuPage(page);
        const formLayout = new FormLayoutsPage(page);
        const datepickerPage = new DatepickerPage(page);
        const topbarPage =  new TopbarPage(page);
        await use({ featureMenu, formLayout, datepickerPage, topbarPage });
    },
});