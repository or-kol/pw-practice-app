import { Page } from "@playwright/test";
import { Logger } from "../logger";
import { LocatorHelper } from "../locatorHelper";

/**
 * MouseInteractionMixin provides advanced mouse interaction capabilities
 * including hover effects, mouse movements, and keyboard interactions
 */
export class MouseInteractionMixin {
    
    constructor(private page: Page) {}

    /**
     * Hovers the mouse over the element specified by the selector.
     * Waits for the element to be visible (timeout: 5000ms).
     * Optionally waits for a specified amount of time after hovering.
     * @param selector - The CSS selector of the element to hover.
     * @param waitAfterMs - Optional delay in milliseconds after hover (default is 0).
     * @returns True if hover was successful, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting and hovering. Logs a warning and returns false if the element is not found or not hoverable.
     */
    async hover(selector: string, waitAfterMs: number = 0): Promise<boolean> {
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: 5000 });
            await locator.hover({ timeout: 5000 });

            if (waitAfterMs > 0) {
                await this.page.waitForTimeout(waitAfterMs);
            }

            return true;
        });
    }

    /**
     * Quickly hovers over all elements matching the given locator, moving the mouse to the center of each.
     * Waits for the elements to be attached (timeout: 5000ms).
     * @param buttonsLocator - The CSS selector for the group of buttons to sweep over.
     * @returns A Promise that resolves when the sweep is complete.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning if no elements are found.
     */
    async fastSweepHover(buttonsLocator: string): Promise<void> {
        await LocatorHelper.withLocator(this.page, buttonsLocator, async (locator) => {
            await locator.waitFor({ state: "attached", timeout: 5000 });
            const buttons = await locator.elementHandles();

            if (buttons.length === 0) {
                Logger.logWarning(`Selector not found: ${buttonsLocator}`);
                return;
            }

            for (const btn of buttons) {
                const box = await btn.boundingBox();

                if (box) {
                    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 1 });
                }
            }
        });
    }

    /**
     * Moves the mouse cursor to the center of the specified element and optionally drags it by a given offset.
     * Waits for the element to be visible using ACTION_TIMEOUT.
     * @param selector - CSS selector used to locate the target element.
     * @param pixelsToMoveX - Number of pixels to move horizontally from the element's center (default is 0).
     * @param pixelsToMoveY - Number of pixels to move vertically from the element's center (default is 0).
     * @param pressMouseBeforeMove - If true, simulates a mouse press before moving (for drag-and-drop interactions).
     * @returns True if the movement succeeds, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns false if the element is not found or the mouse action fails.
     */
    async moveMouseInBoxedElement(selector: string, pixelsToMoveX: number = 0, pixelsToMoveY: number = 0, pressMouseBeforeMove: boolean = false): Promise<boolean> {
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: 5000 });
            const box = await locator.boundingBox();

            if (!box) {
                Logger.logWarning(`Selector not found: ${selector}`);
                return false;
            }

            const centerX = box.x + box.width / 2;
            const centerY = box.y + box.height / 2;
            await this.page.mouse.move(centerX, centerY, { steps: 20 });

            if (pressMouseBeforeMove) {
                await this.page.mouse.down();
                await this.page.mouse.move(centerX + pixelsToMoveX, centerY + pixelsToMoveY, { steps: 20 });
                await this.page.mouse.up();
            } else {
                await this.page.mouse.move(centerX + pixelsToMoveX, centerY + pixelsToMoveY, { steps: 20 });
            }

            return true;
        });
    }

    /**
     * Presses a keyboard key on a specific element or the currently focused element.
     * Waits for the element to be visible if a selector is provided (timeout: 5000ms).
     * @param key - The name of the key to press (e.g., 'Enter', 'Escape').
     * @param selector - Optional. If provided, presses the key on that element. Otherwise, uses page-level keyboard.
     * @returns True if the key was pressed successfully, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting and pressing. Logs a warning and returns false if the element is not found or the key cannot be pressed.
     */
    async pressKeyboardKey(key: string, selector?: string): Promise<boolean> {
        if (selector) {
            return LocatorHelper.withLocator(this.page, selector, async (locator) => {
                await locator.waitFor({ state: "visible", timeout: 5000 });
                await locator.press(key, { timeout: 5000 });
                return true;
            });
        } else {
            try {
                await this.page.keyboard.press(key);
                return true;
            } catch (error) {
                Logger.logWarning(`Selector not found: ${selector ?? "keyboard"}`);
                return false;
            }
        }
    }
}