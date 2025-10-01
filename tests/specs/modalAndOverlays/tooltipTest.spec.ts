import { test } from "../../page_objects/utils/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../page_objects/utils/testConfig";

const toastsPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/tooltipPageData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.tooltipPage.goToTooltipPage();
});


test.describe(`Tooltip tab content validation test suite`, () => {
    const tooltipContent = toastsPageData.tooltipContent;
    const tooltipReflection = toastsPageData.tooltipReflection;
    tooltipReflection.forEach(({ buttonName, xfail }) => {
        test(`Tooltip content: ${buttonName} test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for tooltip content: ${buttonName}`);
            }
            await pageManager.tooltipPage.tooltipTabContentValidation(tooltipContent, buttonName);
        });
    });
});


test.describe(`Tooltip icon validation test suite`, () => {
    const tooltipsIcons = toastsPageData.tooltipsIcons;
    tooltipsIcons.forEach(({ icon, xfail }) => {
        test(`Tooltip icon: ${icon} test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for tooltip icon: ${icon}`);
            };
            await pageManager.tooltipPage.tooltipIconValidation(icon);
        });
    });
});


test.describe(`Tooltip position validation test suite`, () => {
    const tooltipPositions = toastsPageData.tooltipPositions;
    tooltipPositions.forEach(({ position, classValidation, xfail }) => {
        test(`Tooltip position: ${position} test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for tooltip position: ${position}`);
            };
            await pageManager.tooltipPage.tooltipPositionValidation(position, classValidation);
        });
    });
});


test.describe(`Tooltip color validation test suite`, () => {
    const tooltipBackgroundColors = toastsPageData.tooltipBackgroundColors;
    tooltipBackgroundColors.forEach(({ type, color, xfail }) => {
        test(`Tooltip type: ${type} test`, async () => {
            if (xfail) {
                test.fail(true, `Expected failure for tooltip type: ${type}`);
            };
            await pageManager.tooltipPage.tooltipColorValidation(type, color);
        });
    });
});


