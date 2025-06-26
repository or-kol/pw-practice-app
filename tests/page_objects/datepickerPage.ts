import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class DatepickerPage extends BasePage{

    constructor(page: Page){
        super(page);
    }

    /**
     * Selects a date or a range of dates in the calendar.
     * @param placeholder - placeholder text of the input field
     * @param startOffset - number of days from today for the start date
     * @param endOffset - optional, number of days from today for the end date (for range selection)
     * @returns true if the selected date(s) match the expected format, false otherwise
     */
    async selectDates(placeholder: string, startOffset: number, endOffset?: number){
        const calendarLocator = `input[placeholder="${placeholder}"]`;
        await this.click(calendarLocator);

        const expectedStartDate = await this.selectDateInTheCalendar(startOffset);

        let actualDate: string;

        if (endOffset){
            const expectedEndDate = await this.selectDateInTheCalendar(endOffset);
            actualDate = await this.getText(calendarLocator);
            return actualDate === `${expectedStartDate} - ${expectedEndDate}`;
        }
        else{
            actualDate = await this.getText(calendarLocator);
            return actualDate === expectedStartDate;
        }
    }


    /**
     * select a date in the calendar.
     * @param numberOfDaysFromToday - number of days from today to select
     * @returns expected date in the format "MMM DD, YYYY"
     */
    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDay = date.getDate().toString();
        const expectedMonth = date.toLocaleString("En-US", {month: "short"});
        const expectedYear = date.getFullYear().toString();
        const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`;

        await this.click("nb-calendar-view-mode button");
        await this.click(`.year-cell:has-text("${date.getFullYear().toString()}")`);
        await this.click(`.month-cell:has-text("${expectedMonth.toUpperCase()}")`);
        await this.page.locator(".day-cell:not(.bounding-month)").getByText(expectedDay, { exact: true }).click(); // no other way to use 
                                                                                                                   // "exact" option in Playwright
        return expectedDate;
    }
}