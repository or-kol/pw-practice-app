
import { test as base, expect, Page } from "@playwright/test";

import { FeaturesMenuPage } from "../page_objects/homePage/featuresMenuNavigationArea";
import { FormLayoutsPage } from "../page_objects/forms/formLayoutsPage";
import { DatepickerPage } from "../page_objects/forms/datepickerPage";
import { TopBarPage } from "../page_objects/homePage/topBarArea";
import { DevideControlModule } from "../page_objects/homePage/devideControlModule";
import { ManagementConsoleModul } from "../page_objects/homePage/managementConsoleModule";

type TestFixtures = {
    baseTest: {
        featureMenu: FeaturesMenuPage;
        formLayouts: FormLayoutsPage;
        datepickerPage: DatepickerPage;
        topbarPage: TopBarPage;
        deviceControlModule: DevideControlModule;
        managementConsoleModul: ManagementConsoleModul;
        page: Page;
    };
};

export const test = base.extend<TestFixtures>({
    baseTest: async ({ browser }, use) => {
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 },
            deviceScaleFactor: 1
        });


        const page = await context.newPage();

        const session = await context.newCDPSession(page);
        const { windowId } = await session.send("Browser.getWindowForTarget");
        await session.send("Browser.setWindowBounds", {
            windowId,
            bounds: { windowState: "fullscreen" },
        });

        await page.goto("http://localhost:4200/");

        const featureMenu = new FeaturesMenuPage(page);
        const formLayouts = new FormLayoutsPage(page);
        const datepickerPage = new DatepickerPage(page);
        const topbarPage = new TopBarPage(page);
        const deviceControlModule = new DevideControlModule(page);
        const managementConsoleModul = new ManagementConsoleModul(page);

        await use({
            featureMenu,
            formLayouts,
            datepickerPage,
            topbarPage,
            deviceControlModule,
            managementConsoleModul,
            page,
        });

        await context.close();
    },
});

export { expect };

