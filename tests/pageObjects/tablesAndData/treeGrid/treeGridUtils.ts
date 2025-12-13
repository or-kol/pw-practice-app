import { Page } from "@playwright/test";
import { TreeGridRowData, TablesAndDataUtils } from "../TablesAndDataUtils";

export { TreeGridRowData };

export class TreeGridUtils extends TablesAndDataUtils {
    
    private readonly TREE_GRID_TABLE_SELECTOR = 'ngx-tree-grid table';

    private readonly TREE_GRID_CONFIG = {
        rowSelector: `${this.TREE_GRID_TABLE_SELECTOR} tbody tr[nbtreegridrow]:has(td)`,
        columnMapping: {
            "Name": 0,
            "Size": 1,
            "Kind": 2,
            "Items": 3
        } as unknown as { [K in keyof TreeGridRowData]: number },
        skipColumns: []
    };

    constructor(page: Page) {
        super(page);
    };
    
    async getAllTreeGridRows(): Promise<TreeGridRowData[]> {
        await this.waitForTimeout(this.HALF_SEC);
        const data = await this.readTableData<TreeGridRowData>(
            this.TREE_GRID_CONFIG.rowSelector,
            this.TREE_GRID_CONFIG.columnMapping,
            this.TREE_GRID_CONFIG.skipColumns
        ) as TreeGridRowData[];
        return data;
    };
};


