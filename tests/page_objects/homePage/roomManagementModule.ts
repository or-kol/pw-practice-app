import { Page } from "@playwright/test";
import { BasePage } from "../basePage";


export class RoomManagementModule extends BasePage{
    constructor(page: Page){
        super(page);
    }


    async selectRoomManagement(roomId: string){
        const roomLocator = `g[id="${roomId}"]`;
        await this.click(roomLocator);

        const selectedClass = await this.getAttribute(roomLocator, "class");
        return selectedClass.includes("selected-room")
    }


    async progressBarScrubbing(xAxis: number, yAxis: number, expectedPossition: string): Promise<boolean> {
        const progressBarLocator = `ngx-player:has-text("My Playlist") nb-card-body .progress-wrap`;
        await this.scrollIntoView(progressBarLocator);
        await this.moveMouseInBoxedElement(progressBarLocator, xAxis, yAxis, true);
        const barPercentage = await this.getAttribute(`${progressBarLocator} div`, "style");
        return barPercentage.includes(expectedPossition);

    }


    private async getSongName(): Promise<string> {
        const songLocator = `ngx-player:has-text("My Playlist") .details`;
        const songName = await this.getText(songLocator);
        return songName
    }

}