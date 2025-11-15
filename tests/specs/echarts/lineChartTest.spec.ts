import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";


const lineChartData = require(`${TEST_PATHS.TEST_DATA}/echarts/lineChartData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.barChartModule.goToEchartsPage();
});


test(`Line chart colors validation test`, async ({}, testInfo) => {
    const expectedColors = lineChartData.lineChart.linesData.map(line => line.color);
    handleXfail(testInfo, specFile);
    await pageManager.lineChartModule.validateLineChartColors(expectedColors);
});

test.describe(`Line chart legend buttons validation test suite`, () => {
    const linesLegendCoordinates = lineChartData.lineChart.linesLegendCoordinates;
    linesLegendCoordinates.forEach(({lineName, legendCoordinates}) => {
        test(`Legend button: ${lineName} validation test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            const lineColor = [lineChartData.lineChart.linesData.find(l => l.lineName === lineName)?.color];
            await pageManager.lineChartModule.lineLegendButtonFunctionality(legendCoordinates.x, legendCoordinates.y, lineColor);
        });
    });
});

test.describe(`Line chart data validation test suite`, () => {
    const allPoints = lineChartData.lineChart.linesData.flatMap(line =>
        line.points.map(pt => ({
            value: pt.value,
            coordinates: pt,
            lineName: line.lineName,
            pointName: pt.pointName
        }))
    );

    allPoints.forEach(({ lineName, pointName, value, coordinates }) => {
        test(`Line ${lineName}, ${pointName} validation test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.lineChartModule.lineChartContentValidation(coordinates.x, coordinates.y, value);
        });
    });
});


