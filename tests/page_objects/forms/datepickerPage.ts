import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class DatepickerPage extends BasePage{

    constructor(page: Page){
        super(page);
    };

    async goToDatePickerPage(): Promise<void> {
        await this.click(`a[title="Forms"]`);
        await this.click(`a:has-text("Datepicker")`);
    };

    
    async selectDates(placeholder: string, startOffset: number, endOffset?: number): Promise<void> {
        const calendarLocator = `input[placeholder="${placeholder}"]`;
        await this.click(calendarLocator, 500);

        const expectedStartDate = await this.selectDateInTheCalendar(startOffset);

        if (endOffset) {
            const expectedEndDate = await this.selectDateInTheCalendar(endOffset);
            const expectedDateRange = `${expectedStartDate} - ${expectedEndDate}`;
            await expect(this.page.locator(calendarLocator)).toHaveValue(expectedDateRange, { timeout: 5000 });
        } else {
            await expect(this.page.locator(calendarLocator)).toHaveValue(expectedStartDate, { timeout: 5000 });
        }
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
}