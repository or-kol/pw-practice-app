import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";
import { point } from "leaflet";

const lineChartData = require(`${TEST_PATHS.TEST_DATA}/charts/lineChartData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.barChartModule.goToEchartsPage();
});

test(`Line chart colors validation test`, async ({}, testInfo) => {
    const expectedColors = lineChartData.lineChart.map(line => line.color);
    handleXfail(testInfo, specFile);
    await pageManager.lineChartModule.validateLineChartColors(expectedColors);
});

test.describe(`Line chart data validation test suite`, () => {
    const allPoints = lineChartData.lineChart.flatMap(line =>
        line.points.map(pt => ({
            value: pt.value,
            coordinates: pt,
            lineName: line.name,
            pointName: pt.name
        }))
    );

    allPoints.forEach(({ lineName, pointName, value, coordinates }) => {
        test(`Line ${lineName}, ${pointName} validation test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.lineChartModule.lineChartContentValidation(coordinates.x, coordinates.y, value);
        });
    });
});
