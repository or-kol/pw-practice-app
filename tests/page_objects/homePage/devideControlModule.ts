import { BasePage } from "../basePage";
import { Page } from "@playwright/test";


export class DevideControlModule extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async controlerSwitch(controllerName: string, switchDesiredStatus: "ON" | "OFF", ): Promise<boolean> {
        const switchLocator = `ngx-status-card[ng-reflect-title='${controllerName}']`;
        const switchStatusLocator = `${switchLocator} div.status.paragraph-2`;

        const switchInitialStatus = await this.getText(switchStatusLocator);

        if (switchInitialStatus != switchDesiredStatus) {
            await this.click(switchLocator);
        }
        else {
            return true;
        }

        const switchCurrentstatus = await this.getText(switchStatusLocator);
        return switchCurrentstatus == switchDesiredStatus;
    }

    async tempSwitch(){
        const tempSwitchLoctor = "[tabtitle='Temperature'] ngx-temperature-dragger circle";
        const tempValueLoctor = "[tabtitle='Temperature'] ngx-temperature-dragger";
        await this.setAttributeVal(tempSwitchLoctor, "cx", "232.63");
        await this.setAttributeVal(tempSwitchLoctor, "cy", "232.63");
        await this.click(tempSwitchLoctor);
        const temp = await this.getText(tempValueLoctor);
        return temp.includes("30");
    }

    async tempSwitch2(offsetX: number, offsetY: number, expectedTemp: string){
        const tempSwitchLoctor = "[tabtitle='Temperature'] ngx-temperature-dragger";
        await this.scrollIntoView(tempSwitchLoctor);
        await this.moveMouseToBoxedElement(tempSwitchLoctor, offsetX, offsetY, true);
        const temp = await this.getText(tempSwitchLoctor);
        return temp.includes(expectedTemp);
    }


    async tempSwitchStates(desiredState: string): Promise<boolean>  {
        let stateButtonLoctor: string;
        switch (desiredState){
            case "cool":
                stateButtonLoctor = "[tabtitle='Temperature'] .nb-snowy-circled";
                break;
            case "warm":
                stateButtonLoctor = "[tabtitle='Temperature'] .nb-sunny-circled";
                break;
            case "heat":
                stateButtonLoctor = "[tabtitle='Temperature'] .nb-flame-circled";
                break;
            case "fan":
                stateButtonLoctor = "[tabtitle='Temperature'] .nb-loop-circled";
                break;
            default:
                console.log("State button was not found")
        }
        
        await this.click(stateButtonLoctor);
        const currentState = this.getAttribute("[ng-reflect-name='temperature-mode']", "ng-reflect-model");

        return (await currentState).includes(desiredState);
    }


    async tempSwitchOnOffButton(desiredState: "on" | "off"): Promise<boolean> {
        const tempSwitchLoctor = "[tabtitle='Temperature'] ngx-temperature-dragger button";
        let classAttr = await this.getAttribute(tempSwitchLoctor, "class");
        const isOnInitailly = /\bon\b/.test(classAttr ?? "");

        if (isOnInitailly && desiredState === "off" || !(isOnInitailly) && desiredState === "on"){
            await this.click(tempSwitchLoctor);
        }
        
        classAttr = await this.getAttribute(tempSwitchLoctor, "class");
        const isOnFinally = /\bon\b/.test(classAttr ?? "");

        return (desiredState === "on" && isOnFinally) || (desiredState === "off" && !(isOnFinally));
    }
}