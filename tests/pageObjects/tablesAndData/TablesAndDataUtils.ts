import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";
import { Logger } from "../../utils";

export type RowData = {
        "ID": string;
        "First Name": string;
        "Last Name": string;
        "Username": string;
        "E-mail": string;
        "Age": string;
    };

export class TablesAndDataUtils extends BasePage {

    constructor(page: Page) {
        super(page);
    };


    validateSort(data: RowData[], columnKey: keyof RowData, sortOrder: 'ascending' | 'descending'): boolean {
        if (!data || data.length === 0) {
            Logger.logWarning('Sort validation skipped: No data provided');
            return true; // Empty arrays are considered sorted
        };
        
        if (data.length === 1) {
            Logger.logInfo('Sort validation passed: Single row is always sorted');
            return true;
        };
        
        for (let i = 1; i < data.length; i++) {
            const currentValue = data[i][columnKey];
            const previousValue = data[i - 1][columnKey];
            const comparison = this.compareValues(previousValue, currentValue);
            
            if ((sortOrder === 'ascending' && comparison > 0) || (sortOrder === 'descending' && comparison < 0)) {
                Logger.logError(
                    `Sort validation failed: ${sortOrder} order violation at row ${i}`,
                    {
                        column: columnKey,
                        expected: sortOrder === 'ascending' ? 'previous ≤ current' : 'previous ≥ current',
                        actual: `"${previousValue}" vs "${currentValue}"`,
                    }
                );
                return false;
            };
        };
        return true;
    };

    private compareValues(a: string, b: string): number {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        
        // If both are valid numbers, compare as numbers
        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        };
        
        // Otherwise compare as strings (case-insensitive)
        return a.toLowerCase().localeCompare(b.toLowerCase());
    };

};