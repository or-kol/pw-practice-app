import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const pieChartData = require(`${TEST_PATHS.TEST_DATA}/charts/pieChartData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.pieChartModule.goToEchartsPage();
});


test(`Pie chart colors validation test`, async ({}, testInfo) => {
    const expectedColors = pieChartData.pieChart.countriesColors.map((segment: any) => segment.color);
        
        handleXfail(testInfo, specFile);
        await pageManager.pieChartModule.validatePieChartColors(expectedColors);
});

test.describe(`Pie chart legend buttons validation test suite`, () => {
    const countriesLegendCoordinates = pieChartData.pieChart.countriesLegendCoordinates;
    countriesLegendCoordinates.forEach(({country, legendCoordinates}) => {
        test(`Legend button: ${country} validation test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.pieChartModule.countryButtonFunctionality(legendCoordinates.x, legendCoordinates.y, `${country}Removed`, country);
        });
    });
});

test.describe(`Countries chart data validation test suite`, () => {
    const countriesChartData = pieChartData.pieChart.countriesChartData;
    countriesChartData.forEach(({country, coordinatesOnChart, value, percentage}) => {
        test(`Country: ${country} validation test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.pieChartModule.pieChartContentValidation(country, coordinatesOnChart.x, coordinatesOnChart.y, value, percentage);
        });
    });
});
