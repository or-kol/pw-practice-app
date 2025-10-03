import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../page_objects/pageManager";
import path from "path";

const tooltipPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/tooltipPageData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.tooltipPage.goToTooltipPage();
});


test.describe(`Tooltip tab content validation test suite`, () => {
    const tooltipContent = tooltipPageData.tooltipContent;
    const buttons = tooltipPageData.buttons;
    buttons.forEach((buttonName: string) => {
        test(`Tooltip content: ${buttonName} test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.tooltipPage.tooltipTabContentValidation(tooltipContent, buttonName);
        });
    });
});

test.describe(`Tooltip icon validation test suite`, () => {
    const icons = tooltipPageData.icons;
    icons.forEach((icon: string) => {
        test(`Tooltip icon: ${icon} test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.tooltipPage.tooltipIconValidation(icon);
        });
    });
});

test.describe(`Tooltip position validation test suite`, () => {
    const positions = tooltipPageData.variants.positions;
    positions.forEach(({ label, class: classValidation }: { label: string, class: string }) => {
        test(`Tooltip position: ${label} test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.tooltipPage.tooltipPositionValidation(label, classValidation);
        });
    });
});

test.describe(`Tooltip color validation test suite`, () => {
    const backgroundColors = tooltipPageData.variants.backgroundColors;
    backgroundColors.forEach(({ type, color }: { type: string, color: string }) => {
        test(`Tooltip type: ${type} test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.tooltipPage.tooltipColorValidation(type, color);
        });
    });
});


