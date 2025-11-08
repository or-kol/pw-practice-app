import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const radarChartData = require(`${TEST_PATHS.TEST_DATA}/charts/radarChartData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.pieChartModule.goToEchartsPage();
});


test(`Radar chart colors validation test`, async ({}, testInfo) => {
    const expectedColors = radarChartData.radarChart.legend.map((segment: any) => segment.color);
    handleXfail(testInfo, specFile);
    await pageManager.radarChartModule.validateRadarChartColors(expectedColors);
});

test.describe(`Radar chart legend buttons validation test suite`, () => {
    const countriesLegendCoordinates = radarChartData.radarChart.legend;
    countriesLegendCoordinates.forEach(({name, color, legendCoordinates}) => {
        test(`Legend button: ${name} validation test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.radarChartModule.radarChartLegendButtonFunctionality(legendCoordinates.x, legendCoordinates.y, [color]);
        });
    });
});


test.describe(`Countries chart data validation test suite`, () => {
    const countriesChartData = radarChartData.radarChart.datasets;
    countriesChartData.forEach(({name, points}) => {
        points.forEach(({category, coordinates, value}) => {
            test(`${name}: ${category} validation test`, async ({}, testInfo) => {
                handleXfail(testInfo, specFile);
                await pageManager.radarChartModule.radarChartContentValidation(category, coordinates.x, coordinates.y, value);
            });
        });
    });
});
