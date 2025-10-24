import { Page } from "@playwright/test";
import getColors from "get-image-colors";
import { TEST_PATHS } from "../testConfig";
import { Logger } from "../logger";
import { LocatorHelper } from "../locatorHelper";

/**
 * VisualTestingMixin provides advanced visual testing capabilities
 * including screenshots, color validation, and OCR text extraction
 */
export class VisualTestingMixin {
    
    constructor(private page: Page) {}

    /**
     * Measures the duration (in milliseconds) that an element remains visible on the screen.
     * Waits for the element to appear, then times until it disappears or maxWaitTime is reached.
     * @param selector - CSS selector of the element to monitor.
     * @param maxWaitTime - Maximum time to wait for appear/disappear (default: 30000ms).
     * @returns The duration in ms the element was visible, or -1 if not found/disappeared in time.
     * @remarks Useful for measuring notification or popup lifetimes.
     */
    async measureElementVisibilityDuration(selector: string, maxWaitTime: number = 30000): Promise<number> {
        return (await LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: maxWaitTime });
            const startTime = Date.now();
            let endTime: number;
            
            // Poll until element is no longer visible
            while (await locator.isVisible()) {
                endTime = Date.now();
                if (endTime - startTime > maxWaitTime) break;
                await this.page.waitForTimeout(100); // Small delay to prevent excessive polling
            };
            
            return endTime! - startTime;
        })) as number || -1;
    };

    /**
     * Takes a screenshot of a visible element and saves it to the screenshots folder.
     * Waits for the element to be visible before capturing.
     * @param selector - CSS selector of the element to screenshot.
     * @param screenshotName - Name for the screenshot file (without extension).
     * @returns The screenshot file path if successful, or null if failed.
     */
    async takeElementScreenshot(selector: string, screenshotName: string): Promise<string | null> {
        const screenshotPath = `${TEST_PATHS.SCREENSHOTS}/${screenshotName}.png`;
        const result = await LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: 5000 });
            await locator.screenshot({ path: screenshotPath, animations: 'disabled' });
            return true;
        });
        return result ? screenshotPath : null;
    };

    /**
     * Takes a screenshot of the entire page and saves it to the screenshots folder.
     * @param screenshotName - Name for the screenshot file (without extension).
     * @returns The screenshot file path if successful, or null if failed.
     */
    async takePageScreenshot(screenshotName: string): Promise<string | null> {
        const screenshotPath = `${TEST_PATHS.SCREENSHOTS}/${screenshotName}.png`;
        try {
            await this.page.screenshot({ path: screenshotPath, animations: 'disabled' });
            return screenshotPath;
        } catch (error) {
            Logger.logError('Page screenshot', error);
            return null;
        };
    };

    /**
     * Waits for an element to be visible and stable, then takes a screenshot.
     * Useful for charts or dynamic content that need time to render completely.
     * @param selector - CSS selector of the element.
     * @param screenshotName - Name for the screenshot file (without extension).
     * @param stabilityTimeMs - Time to wait for stability before screenshot (default: 1000ms).
     * @returns The screenshot file path if successful, or null if failed.
     */
    async takeStableElementScreenshot(selector: string, screenshotName: string, stabilityTimeMs: number = 1000): Promise<string | null> {
        const screenshotPath = `${TEST_PATHS.SCREENSHOTS}/${screenshotName}.png`;
        const result = await LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: 5000 });
            await this.page.waitForTimeout(stabilityTimeMs);
            await locator.screenshot({ path: screenshotPath, animations: 'disabled' });
            return true;
        });
        return result ? screenshotPath : null;
    };

    /**
     * Extracts dominant colors from an image file using get-image-colors.
     * Useful for visual regression and color validation tests.
     * @param imagePath - Path to the screenshot image file.
     * @returns Array of color objects (each with a .rgb() method for RGB values).
     */
    async extractColorsFromImage(imagePath: string): Promise<any[]> {
        try {
            return await getColors(imagePath, {count: 20});
        } catch (error) {
            Logger.logError('Color extraction', error);
            return [];
        };
    };

    /**
     * Compares extracted colors to expected RGB values with a given tolerance.
     * Returns true if all expected colors are found within the tolerance in the extracted set.
     * @param extractedColors - Array of color objects (with .rgb() method for RGB values).
     * @param expectedColors - Array of expected RGB color values ({r, g, b}).
     * @param tolerance - Allowed RGB difference for color matching (default: 50).
     * @returns True if all expected colors are found within tolerance, false otherwise.
     */
    compareColorsToExpected(extractedColors: any[], expectedColors: {r: number, g: number, b: number}[], tolerance: number = 50): boolean {
        for (const expectedColor of expectedColors) {
            const isFound = extractedColors.some((color: { rgb: () => any; }) => {
                const rgb = color.rgb();
                return Math.abs(rgb[0] - expectedColor.r) <= tolerance && 
                       Math.abs(rgb[1] - expectedColor.g) <= tolerance && 
                       Math.abs(rgb[2] - expectedColor.b) <= tolerance;
            });
            if (!isFound) {
                Logger.logWarning(`Color validation failed: Expected [${expectedColor.r}, ${expectedColor.g}, ${expectedColor.b}] not found within tolerance ${tolerance}`);
                return false;
            };
        };
        return true;
    };

    /**
     * Extracts all visible text from an image using OCR (Optical Character Recognition).
     * Preprocesses the image by resizing for better accuracy, then runs Tesseract.js OCR.
     * Cleans up temporary files after extraction.
     * Useful for validating any text content in screenshots, such as chart labels, tooltips, or UI elements.
     * @param imagePath - Absolute or relative path to the image file to process.
     * @returns The extracted text as a trimmed string, or an empty string if extraction fails.
     */
    async extractTextFromImage(imagePath: string): Promise<string> {
        // Preprocess image using sharp to a temp file, gentle contrast only
        const sharp = require('sharp');
        const path = require('path');
        const tempPath = path.join(path.dirname(imagePath), 'temp_' + path.basename(imagePath));
        const fs = require('fs');

        try {
            // Resize and preprocess
            const { width, height } = await sharp(imagePath).metadata();
            await sharp(imagePath)
                .resize({ 
                    width: width ? width * 2 : 400, 
                    height: height ? height * 2 : 200 
                })
                .toFile(tempPath);

            const { createWorker } = require('tesseract.js');
            const worker = await createWorker();
            const { data: { text } } = await worker.recognize(tempPath);
            await worker.terminate();

            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            };

            return text.trim();
        } catch (error) {
            Logger.logError('Text extraction from image', error);

            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            };

            return '';
        };
    };
};