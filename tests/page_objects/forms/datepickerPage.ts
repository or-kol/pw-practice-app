import { Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class DatepickerPage extends BasePage{

    constructor(page: Page){
        super(page);
    }

    async goToDatePickerPage(): Promise<void> {
        await this.page.click(`a[title="Forms"]`);
        await this.page.click(`a:has-text("Datepicker")`);
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
        await this.click(calendarLocator, 500);

        const expectedStartDate = await this.selectDateInTheCalendar(startOffset);

        let actualDate: string;

        if (endOffset){
            const expectedEndDate = await this.selectDateInTheCalendar(endOffset);
            actualDate = await this.getText(calendarLocator);
            console.log(`Selected date range: ${expectedStartDate} - ${expectedEndDate}`);
            return actualDate === `${expectedStartDate} - ${expectedEndDate}`;
        }
        else{
            actualDate = await this.getText(calendarLocator);
            console.log(`Selected date: ${expectedStartDate}, actual date: ${actualDate}`);
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
        await this.click(`.year-cell:has-text("${expectedYear}")`);
        await this.click(`.month-cell:has-text("${expectedMonth.toUpperCase()}")`);
        await this.click(`.day-cell:not(.bounding-month) >> text="${expectedDay}"`);
        
        return expectedDate;
    }
}