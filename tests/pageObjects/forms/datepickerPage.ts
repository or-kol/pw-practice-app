import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";
import { Logger } from "../../utils";

export class DatepickerPage extends BasePage{

    constructor(page: Page){
        super(page);
    };

    async goToDatePickerPage(): Promise<void> {
        await this.click(`a[title="Forms"]`);
        await this.click(`a:has-text("Datepicker")`);
    };
    

    async selectSingleDate(placeholder: string, offset: number, expectInvalid?: boolean): Promise<void> {
        const calendarLocator = `input[placeholder="${placeholder}"]`;
        await this.click(calendarLocator, 500);
        const expectedDate = await this.trySelectDate(offset);
        const actualValue = await this.getText(calendarLocator);
        this.assertSingleDate(actualValue, expectedDate, expectInvalid);
    }

    async selectDateRange(placeholder: string, startOffset: number, endOffset: number): Promise<void> {
        const calendarLocator = `input[placeholder="${placeholder}"]`;

        await this.click(calendarLocator, 500);
        const expectedStart = await this.selectDateInTheCalendar(startOffset);
        const expectedEnd = await this.selectDateInTheCalendar(endOffset);
        const expectedRange = `${expectedStart} - ${expectedEnd}`;
        const actualValue = await this.getText(calendarLocator);
        expect(actualValue).toBe(expectedRange);
    }


    /**
     * Selects a date in the calendar by navigating through year, month, and day.
     * @param numberOfDaysFromToday - Number of days from today to select
     * @returns The formatted date string in "MMM DD, YYYY" format
     * @throws Error if date selection fails at any step
     */
    private async selectDateInTheCalendar(numberOfDaysFromToday: number): Promise<string> {
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDay = date.getDate().toString();
        const expectedMonth = date.toLocaleString("En-US", {month: "short"});
        const expectedYear = date.getFullYear().toString();
        const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`;
        await this.click("nb-calendar-view-mode button");
        await this.click(`.year-cell:has-text("${expectedYear}")`);
        await this.click(`.month-cell:has-text("${expectedMonth.toUpperCase()}")`);
        await this.click(`.day-cell:not(.bounding-month) >> text="${expectedDay}"`);
        return expectedDate;
    };

    /**
     * Tries to select a date in the calendar and returns the formatted date string or undefined if it fails.
     * @param offset - The offset in days from today to select
     * @returns The formatted date string or undefined
     */
    private async trySelectDate(offset: number): Promise<string | undefined> {
        try {
            return await this.selectDateInTheCalendar(offset);
        } catch (e) {
            Logger.logError("selectDateInTheCalendar", e);
            return undefined;
        };
    };

    /**
     * Asserts that the actual value matches the expected date, with optional negative testing.
     * @param actualValue - The actual value from the datepicker input
     * @param expectedDate - The expected date string
     * @param expectInvalid - Whether to expect an invalid date selection
     */
    private assertSingleDate(actualValue: string, expectedDate: string | undefined, expectInvalid?: boolean): void {
        if (expectInvalid) {
            if (actualValue === expectedDate) {
                Logger.logWarning(`Negative test failed: input value matched expected date '${expectedDate}'`);
            };
            expect(actualValue).not.toBe(expectedDate);
        } else {
            if (expectedDate === undefined) {
                Logger.logError("selectSingleDate", "Failed to select the expected date in the calendar");
                throw new Error("Failed to select the expected date in the calendar");
            };
            expect(actualValue).toBe(expectedDate);
        };
    };
};