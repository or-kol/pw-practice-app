import { test } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const themes = require(`${TEST_PATHS.TEST_DATA}/homePage/themeColorsData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
});

test.describe("Sidebar Menu Toggle States", () => {
    ["compacted", "expanded"].forEach(state => {
        test(`Toggle sidebar to "${state}" state`, async () => {
            await pageManager.topBarPage.SidebarMenuToggle(state);
        });
    });
});


test.describe("Website Theme Suite", () => {
    for (const [theme, themeObj] of Object.entries(themes.themeColors) as any[]) {
        test(`Theme "${theme}" should apply correct background color`, async () => {
            if (themeObj.xfail) {
                test.fail(true, `Expected failure for theme: ${theme}`);
            };
            await pageManager.topBarPage.changeWebsiteThemeColor(theme, themeObj.color);
        });
    };
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
