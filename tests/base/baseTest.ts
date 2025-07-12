import { test as base } from "@playwright/test";
import { FeaturesMenuPage } from "../page_objects/homePage/featuresMenuNavigationArea";
import { FormLayoutsPage } from "../page_objects/forms/formLayoutsPage";
import { DatepickerPage } from "../page_objects/forms/datepickerPage";
import { TopBarPage } from "../page_objects/homePage/topBarArea";
import { DevideControlModule } from "../page_objects/homePage/devideControlModule"
import { ManagementConsoleModul } from "../page_objects/homePage/managementConsoleModule";


type TestFixtures = {
    baseTest: {
        featureMenu: FeaturesMenuPage;
        formLayout: FormLayoutsPage;
        datepickerPage: DatepickerPage;
        topbarPage: TopBarPage;
        deviceControlModule: DevideControlModule
        managementConsoleModul: ManagementConsoleModul
    };
};


export const test = base.extend<TestFixtures>({
    baseTest: async ({ page }, use) => {
        const featureMenu = new FeaturesMenuPage(page);
        const formLayout = new FormLayoutsPage(page);
        const datepickerPage = new DatepickerPage(page);
        const topbarPage =  new TopBarPage(page);
        const deviceControlModule = new DevideControlModule(page);
        const managementConsoleModul = new ManagementConsoleModul(page);
        await use({ featureMenu, formLayout, datepickerPage, topbarPage, deviceControlModule,
            managementConsoleModul});
    }
});