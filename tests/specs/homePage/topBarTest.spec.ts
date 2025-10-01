import { test } from "../../page_objects/utils/browserSetup";
import { PageManager } from "../../page_objects/pageManager";

import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const topBarData = require(`${TEST_PATHS.TEST_DATA}/homePage/topBarData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe("Sidebar Menu Toggle States", () => {
    const sidebarMenuStates = topBarData.sidebarMenuStates;
    sidebarMenuStates.forEach(({ state, xfail }) => {
        test(`Toggle sidebar to "${state}" state`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for sidebar state: ${state}`);
            };
            await pageManager.topBarPage.SidebarMenuToggle(state);
        });
    });
});


test.describe("Website Theme Suite", () => {
    const themeColors = topBarData.themeColors;
    themeColors.forEach(({ name, color, xfail }) => {
        test(`Theme "${name}" should apply correct background color`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for theme: ${name}`);
            };
            await pageManager.topBarPage.changeWebsiteThemeColor(name, color);
        });
    });
});


test ("Searchbar functionality test", async () => {
    await pageManager.topBarPage.searchbarFunctionality("Search text");
});


test ("Email icon visibility test", async () => {
    await pageManager.topBarPage.mailboxIcon();
});


test ("Notifications icon visibility test", async () => {
    await pageManager.topBarPage.notificationsIcon();
});


test ("User profile visibility test", async () => {
    await pageManager.topBarPage.userProfile();
});


test ("Log out visibility test", async () => {
    await pageManager.topBarPage.userLogOut();
});
