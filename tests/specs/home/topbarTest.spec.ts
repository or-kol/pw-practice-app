import {expect} from "@playwright/test";
import { test } from "../../base/baseTest";
import themes from "../../data/themeColorsData.json";


test.beforeEach(async({baseTest}) => {
    await baseTest.featureMenu.navigateTo("http://localhost:4200/");
});


test.describe("Sidebar Menu Toggle States", () => {
    const sidebarStates = ["compacted", "expanded"] as const;

    for (const state of sidebarStates) {
        test(`Toggle sidebar to "${state}" state`, async ({ baseTest }) => {
            const isInExpectedState = await baseTest.topbarPage.SidebarMenuToggle(state);
            expect(isInExpectedState).toBe(true);
        });
    }
});


test.describe("Website Theme Suite", () => {
    for (const [theme, expectedTheme] of Object.entries(themes)) {
        test(`Theme "${theme}" should apply correct background color`, async ({ baseTest }) => {
            const actualTheme = await baseTest.topbarPage.changeWebsiteThemeColor(theme)
            expect(actualTheme).toEqual(expectedTheme);
        });
    }
});


test ("Searchbar functionality test", async ({ baseTest }) => {
    const isSearchSuccessful = await baseTest.topbarPage.searchbarFunctionality("Search text");
    expect(isSearchSuccessful).toBe(true);
})


test ("Email icon visibility test", async ({ baseTest }) => {
    const isMailboxIconVisible = await baseTest.topbarPage.mailboxIcon();
    expect(isMailboxIconVisible).toBe(true);
});


test ("Notifications icon visibility test", async ({ baseTest }) => {
    const isNotificationsIconVisible = await baseTest.topbarPage.notificationsIcon();
    expect(isNotificationsIconVisible).toBe(true);
});
