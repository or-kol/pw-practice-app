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
        const progressBarLocator = `ngx-player nb-card-body .progress-wrap`;
        await this.scrollIntoView(progressBarLocator);
        await this.moveMouseInBoxedElement(progressBarLocator, xAxis, yAxis, true);
        const barPercentage = await this.getAttribute(`${progressBarLocator} div`, "style");
        return barPercentage.includes(expectedPossition);

    }

    
    async playlistshufleOrRepeat(buttonPlace: number): Promise<boolean>{
        const playlistControlButtonsLocator = `ngx-player nb-card-body .controls button:nth-of-type(${buttonPlace})`;
        await this.click(playlistControlButtonsLocator);

        const buttonClass = await this.getAttribute(playlistControlButtonsLocator, "class");
        return /\bon\b/.test(buttonClass);
    }

    async playlistPrevOrNext(buttonPlace: number): Promise<boolean>{
        const playlistControlButtonsLocator = `ngx-player nb-card-body .controls button:nth-of-type(${buttonPlace})`;
        const songDataLocator = `ngx-player .details`;
        const initialSongData = await this.getText(songDataLocator);
        await this.click(playlistControlButtonsLocator);
        const postClickSongData = await this.getText(songDataLocator);
        
        return initialSongData !== postClickSongData;
    }

    async playlistPlayOrPause(buttonPlace: number, expectedState: string): Promise<boolean>{
        const playlistControlButtonsLocator = `ngx-player nb-card-body .controls button:nth-of-type(${buttonPlace})`;
        await this.click(playlistControlButtonsLocator);

        if (expectedState === `pause`) {
            await this.click(playlistControlButtonsLocator);
        }

        const buttonIcon = await this.getAttribute(playlistControlButtonsLocator, `ng-reflect-icon`);
        return !(buttonIcon.includes(expectedState))
    }

    async muteVolune(): Promise<boolean> {
        const muteButtonLocator = `ngx-player nb-card-footer [icon="volume-down-outline"]`;
        const volumeStatusLocator = `ngx-player nb-card-footer .progress-wrap div`;

        await this.click(muteButtonLocator);
        const volumeStatus = await this.getAttribute(volumeStatusLocator, `style`);

        return volumeStatus.includes(`width: 0%`);
    }
}