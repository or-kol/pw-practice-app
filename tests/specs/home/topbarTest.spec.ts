import {expect} from "@playwright/test";
import { test } from "../../base/baseTest";


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
