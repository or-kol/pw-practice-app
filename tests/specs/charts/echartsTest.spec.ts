import { test, expect } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const echartsPageData = require(`${TEST_PATHS.TEST_DATA}/charts/echrtsPageData.json`);

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    // Only create PageManager - no page objects instantiated yet
    pageManager = new PageManager(page);
    
    // EchartsPage gets created ONLY when first accessed here
    await pageManager.echartsPage.goToEchartsPage();
});

test(`Pie chart colors validation test`, async () => {
    // Uses the already-created echartsPage instance from beforeEach
    const expectedColors = echartsPageData.pieChart.countriesColors.map((segment: any) => segment.color);
    const result = await pageManager.echartsPage.validatePieChartColors(expectedColors);
    expect(result).toBeTruthy();
});

/*
test.describe(`Legend buttons validation test suite`, () => {
    const countriesLegendCoordinates = echartsPageData.pieChart.countriesLegendCoordinates;
    countriesLegendCoordinates.forEach((country: any) => {
        
        test(`Legend button: ${country.Country} validation test`, async () => {
            
            if (country.xfail) {
                test.fail(true, `Expected failure for legend button: ${country.Country}`);
            }

            // Only echartsPage is used - no other page objects created
            const result = await pageManager.echartsPage.countryButtonFunctionality(
                country.legendCoordinates.x, 
                country.legendCoordinates.y, 
                `${country.Country}Removed`, 
                country.Country
            );
            
            expect(result).toBeTruthy();
        });
    });
});
*/