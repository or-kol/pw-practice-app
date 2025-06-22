import {expect} from "@playwright/test";
import { test } from "../base/baseTest";
import menuData from "../data/menuData.json";


test.beforeEach(async({baseTest}) => {
    await baseTest.featureMenu.navigateTo("http://localhost:4200/");
});

test.describe("Data-driven Navigation", () => {
    for (const menu of menuData) {
        const { category, routes } = menu;

        for (const { subCategory, expectedRes } of routes) {
            test(`Navigate to ${category} > ${subCategory}`, async ({ baseTest }) => {
                const isLoaded = await baseTest.featureMenu.goToMenuPage(category, subCategory, expectedRes);
                expect(isLoaded).toBe(true);
            });
        }
    }
});

