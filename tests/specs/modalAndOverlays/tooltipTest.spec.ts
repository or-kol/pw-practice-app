import { test } from "../../base/browserSetup";
import { PageManager } from "../../page_objects/pageManager";
import { TEST_PATHS } from "../../config/test-config";

const toastsPageData = require(`${TEST_PATHS.TEST_DATA}/modalsAndOverlays/tooltipPageData.json`) as any;

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.tooltipPage.goToTooltipPage();
});


test.describe(`Tooltip tab content validation test suite`, () => {
    const tooltipContent = toastsPageData.tooltipContent;
    const tooltipReflections = toastsPageData.tooltipReflection;
    tooltipReflections.forEach((Reflection) => {
        test(`Tooltip content: ${Reflection.buttonName} test`, async () => {
            if (Reflection.xfail) {
                test.fail(true, `Expected failure for tooltip content: ${Reflection.buttonName}`);
            };
            await pageManager.tooltipPage.tooltipTabContentValidation(tooltipContent, Reflection.buttonName);
        });
    });
});


test.describe(`Tooltip icon validation test suite`, () => {
    const tooltipReflections = toastsPageData.tooltipsIcons;
    tooltipReflections.forEach((icon) => {
        test(`Tooltip icon: ${icon.icon} test`, async () => {
            if (icon.xfail) {
                test.fail(true, `Expected failure for tooltip icon: ${icon.icon}`);
            };
            await pageManager.tooltipPage.tooltipIconValidation(icon.icon);
        });
    });
});


test.describe(`Tooltip position validation test suite`, () => {
    const tooltipPositions = toastsPageData.tooltipPositions;
    tooltipPositions.forEach((position) => {
        test(`Tooltip position: ${position.position} test`, async () => {
            if (position.xfail) {
                test.fail(true, `Expected failure for tooltip position: ${position.position}`);
            };
            await pageManager.tooltipPage.tooltipPositionValidation(position.position, position.classValidation);
        });
    });
});


test.describe(`Tooltip color validation test suite`, () => {
    const tooltipBackgroundColors = toastsPageData.tooltipBackgroundColors;
    tooltipBackgroundColors.forEach((color) => {
        test(`Tooltip type: ${color.type} test`, async () => {
            if (color.xfail) {
                test.fail(true, `Expected failure for tooltip type: ${color.type}`);
            };
            await pageManager.tooltipPage.tooltipColorValidation(color.type, color.color);
        });
    });
});


