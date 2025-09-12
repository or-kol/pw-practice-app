import { test, expect } from "../../base/baseTest";
import themes from "../../data/themeColorsData.json";


test.describe("Sidebar Menu Toggle States", () => {
    ["compacted", "expanded"].forEach(state => {
        test(`Toggle sidebar to "${state}" state`, async ({ baseTest }) => {
            const isInExpectedState = await baseTest.topbarPage.SidebarMenuToggle(state);
            expect(isInExpectedState).toBe(true);
        });
    });
});


test.describe("Website Theme Suite", () => {
    for (const [theme, themeObj] of Object.entries(themes.themeColors)) {
        test(`Theme "${theme}" should apply correct background color`, async ({ baseTest }) => {
            if (themeObj.xfail) {
                test.fail(true, `Expected failure for theme: ${theme}`);
            };
            const actualTheme = await baseTest.topbarPage.changeWebsiteThemeColor(theme);
            expect(actualTheme).toEqual(themeObj.color);
        });
    };
});


test ("Searchbar functionality test", async ({ baseTest }) => {
    const isSearchSuccessful = await baseTest.topbarPage.searchbarFunctionality("Search text");
    expect(isSearchSuccessful).toBe(true);
});


test ("Email icon visibility test", async ({ baseTest }) => {
    const isMailboxIconVisible = await baseTest.topbarPage.mailboxIcon();
    expect(isMailboxIconVisible).toBe(true);
});


test ("Notifications icon visibility test", async ({ baseTest }) => {
    const isNotificationsIconVisible = await baseTest.topbarPage.notificationsIcon();
    expect(isNotificationsIconVisible).toBe(true);
});


test ("User profile visibility test", async ({ baseTest }) => {
    const isUserProfileVisible = await baseTest.topbarPage.userProfile();
    expect(isUserProfileVisible).toBe(true);
});


test ("Log out visibility test", async ({ baseTest }) => {
    const isLogOutVisible = await baseTest.topbarPage.userLogOut();
    expect(isLogOutVisible).toBe(true);
});
