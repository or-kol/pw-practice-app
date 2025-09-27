
import { test as base, expect, Page } from "@playwright/test";
import {
    FeaturesMenuPage,
    FormLayoutsPage,
    DatepickerPage,
    TopBarPage,
    DevideControlModule,
    ManagementConsoleModul,
    RoomManagementModule,
    PhoneModule,
    TrafficConsumption,
    SecurityCameras,
    HomePageFooter,
    DialogPage,
    WindowPage,
    PopoverPage,
    ToastrPage,
    TooltipPage,
    EchartsPage
} from "../page_objects";


type TestFixtures = {
    baseTest: {
        page: Page;
        featureMenu: FeaturesMenuPage;
        formLayouts: FormLayoutsPage;
        datepickerPage: DatepickerPage;
        topbarPage: TopBarPage;
        deviceControlModule: DevideControlModule;
        managementConsoleModul: ManagementConsoleModul;
        roomManagementModule: RoomManagementModule;
        phoneModule: PhoneModule;
        trafficConsumption: TrafficConsumption;
        securityCameras: SecurityCameras;
        homePageFooter: HomePageFooter;
        dialogPage: DialogPage;
        windowPage: WindowPage;
        popoverPage: PopoverPage;
        toastrPage: ToastrPage;
        tooltipPage: TooltipPage;
        echartsPage: EchartsPage;
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
        const roomManagementModule = new RoomManagementModule(page);
        const phoneModule = new PhoneModule(page);
        const trafficConsumption = new TrafficConsumption(page);
        const securityCameras = new SecurityCameras(page);
        const homePageFooter = new HomePageFooter(page);
        const dialogPage = new DialogPage(page);
        const windowPage = new WindowPage(page);
        const popoverPage = new PopoverPage(page);
        const toastrPage = new ToastrPage(page);
        const tooltipPage = new TooltipPage(page);
        const echartsPage = new EchartsPage(page);
        

        await use({
            page,
            featureMenu,
            formLayouts,
            datepickerPage,
            topbarPage,
            deviceControlModule,
            managementConsoleModul,
            roomManagementModule,
            phoneModule,
            trafficConsumption,
            securityCameras,
            homePageFooter,
            dialogPage,
            windowPage,
            popoverPage,
            toastrPage,
            tooltipPage,
            echartsPage,
        });

        await context.close();
    },
});

export { expect };

