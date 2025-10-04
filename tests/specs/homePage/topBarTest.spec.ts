import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const topBarData = require(`${TEST_PATHS.TEST_DATA}/homePage/topBarData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});


test.describe("Sidebar Menu Toggle States", () => {
    const sidebarMenuStates = topBarData.sidebarMenuStates;
    sidebarMenuStates.forEach((state: string) => {
        test(`Toggle sidebar to "${state}" state`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.topBarPage.SidebarMenuToggle(state);
        });
    });
});

test.describe("Website Theme Suite", () => {
    const themeColors = topBarData.themeColors;
    themeColors.forEach(({ name, color }) => {
        test(`Theme "${name}" should apply correct background color`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.topBarPage.changeWebsiteThemeColor(name, color);
        });
    });
});

test ("Searchbar functionality test", async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.topBarPage.searchbarFunctionality("Search text");
});

test ("Email icon visibility test", async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.topBarPage.mailboxIcon();
});

test ("Notifications icon visibility test", async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.topBarPage.notificationsIcon();
});

test ("User profile visibility test", async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.topBarPage.userProfile();
});

test ("Log out visibility test", async ({}, testInfo) => {
    handleXfail(testInfo, specFile);
    await pageManager.topBarPage.userLogOut();
});
