import { Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class DatepickerPage extends BasePage{

    constructor(page: Page){
        super(page);
    }

    async goToDatePickerPage(): Promise<void> {
        await this.click(`a[title="Forms"]`);
        await this.click(`a:has-text("Datepicker")`);
    }

    
    async selectDates(placeholder: string, startOffset: number, endOffset?: number){
        const calendarLocator = `input[placeholder="${placeholder}"]`;
        await this.click(calendarLocator, 500);

        const expectedStartDate = await this.selectDateInTheCalendar(startOffset);
        if (!expectedStartDate) {
            return false;
        }
        let actualDate: string;

        if (endOffset){
            const expectedEndDate = await this.selectDateInTheCalendar(endOffset);
            if (!expectedEndDate) {
                return false;
            }
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

        if (
            !(await this.click("nb-calendar-view-mode button")) ||
            !(await this.click(`.year-cell:has-text("${expectedYear}")`)) ||
            !(await this.click(`.month-cell:has-text("${expectedMonth.toUpperCase()}")`)) ||
            !(await this.click(`.day-cell:not(.bounding-month) >> text="${expectedDay}"`))
        ) {
            return false;
        }
        
        return expectedDate;
    }
}