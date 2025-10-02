import { test, expect } from "../../page_objects/utils/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const echartsPageData = require(`${TEST_PATHS.TEST_DATA}/charts/echrtsPageData.json`);

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.echartsPage.goToEchartsPage();
});


test(`Pie chart colors validation test`, async () => {
    const expectedColors = echartsPageData.pieChart.countriesColors.map((segment: any) => segment.color);
        await pageManager.echartsPage.validatePieChartColors(expectedColors);
});


test.describe(`Legend buttons validation test suite`, () => {
    const countriesLegendCoordinates = echartsPageData.pieChart.countriesLegendCoordinates;

    countriesLegendCoordinates.forEach(({country, legendCoordinates, xfail}) => {
        test(`Legend button: ${country} validation test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for legend button: ${country}`);
            };
            await pageManager.echartsPage.countryButtonFunctionality(legendCoordinates.x, legendCoordinates.y, `${country}Removed`, country);
        });
    });
});


test.describe(`Countries chart data validation test suite`, () => {
    const countriesChartData = echartsPageData.pieChart.countriesChartData;

    countriesChartData.forEach(({country, coordinatesOnChart, value, percentage, xfail}) => {
        test(`Country: ${country} validation test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for country: ${country}`);
            };
            await pageManager.echartsPage.pieChartContentValidation(country, coordinatesOnChart.x, coordinatesOnChart.y, value, percentage);
        });
    });
});


test(`Bar chart colors validation test`, async () => {
    const expectedColors = [echartsPageData.barChart.barsColor];
    await pageManager.echartsPage.validateBarChartColors(expectedColors);
});

test.describe(`Bar chart data validation test suite`, () => {
    const barChartData = echartsPageData.barChart.barsData;

    barChartData.forEach(({day, value, barCoordinates, xfail}) => {
        test(`Bar: ${day} validation test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for bar: ${day}`);
            };
            await pageManager.echartsPage.barChartContentValidation(day, barCoordinates.x, barCoordinates.y, value);
        });
    });
});