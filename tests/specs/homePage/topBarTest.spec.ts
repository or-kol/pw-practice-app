import { test, expect } from "../../base/browserSetup";
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
            const isInExpectedState = await pageManager.topBarPage.SidebarMenuToggle(state);
            expect(isInExpectedState).toBe(true);
        });
    });
});


test.describe("Website Theme Suite", () => {
    for (const [theme, themeObj] of Object.entries(themes.themeColors) as any[]) {
        test(`Theme "${theme}" should apply correct background color`, async () => {
            if (themeObj.xfail) {
                test.fail(true, `Expected failure for theme: ${theme}`);
            };
            const actualTheme = await pageManager.topBarPage.changeWebsiteThemeColor(theme);
            expect(actualTheme).toEqual(themeObj.color);
        });
    };
});


test ("Searchbar functionality test", async () => {
    const isSearchSuccessful = await pageManager.topBarPage.searchbarFunctionality("Search text");
    expect(isSearchSuccessful).toBe(true);
});


test ("Email icon visibility test", async () => {
    const isMailboxIconVisible = await pageManager.topBarPage.mailboxIcon();
    expect(isMailboxIconVisible).toBe(true);
});


test ("Notifications icon visibility test", async () => {
    const isNotificationsIconVisible = await pageManager.topBarPage.notificationsIcon();
    expect(isNotificationsIconVisible).toBe(true);
});


test ("User profile visibility test", async () => {
    const isUserProfileVisible = await pageManager.topBarPage.userProfile();
    expect(isUserProfileVisible).toBe(true);
});


test ("Log out visibility test", async () => {
    const isLogOutVisible = await pageManager.topBarPage.userLogOut();
    expect(isLogOutVisible).toBe(true);
});
