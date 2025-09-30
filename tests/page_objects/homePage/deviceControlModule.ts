import { BasePage } from "../basePage";
import { Page } from "@playwright/test";

export class DeviceControlModule extends BasePage {
    constructor(page: Page) {
        super(page);
    };

    async buttonControllerSwitch(controllerName: string, switchDesiredStatus: "ON" | "OFF", ): Promise<boolean> {
        const switchLocator = `ngx-status-card[ng-reflect-title='${controllerName}']`;
        const switchStatusLocator = `${switchLocator} div.status.paragraph-2`;

        const switchInitialStatus = await this.getText(switchStatusLocator);

        if (switchInitialStatus != switchDesiredStatus) {
            await this.click(switchLocator);
        }
        else {
            return true;
        };

        const switchCurrentstatus = await this.getText(switchStatusLocator);
        return switchCurrentstatus == switchDesiredStatus;
    };

    async tempAndHumiditySwitch(switchName: "Temperature" | "Humidity"){
        if (switchName == "Humidity"){
            this.click(`li.tab >> text=${switchName}`);
        };

        const switchLoctor = `[tabtitle='${switchName}'] ngx-temperature-dragger circle`;
        const valueLoctor = `[tabtitle='${switchName}'] ngx-temperature-dragger`;

        await this.attributes.setAttributeVal(switchLoctor, "cx", "232.63");
        await this.attributes.setAttributeVal(switchLoctor, "cy", "232.63");
        await this.click(switchLoctor);
        const ActualVal = await this.getText(valueLoctor);

        return ActualVal.includes("30") ? switchName = "Temperature": ActualVal.includes("100");
    };

    async tempAndHumiditySwitch2(switchName: "Temperature" | "Humidity", offsetX: number, offsetY: number, expectedTemp: string){
        if (switchName == "Humidity"){
            this.click(`li.tab >> text=${switchName}`);
        };

        const switchLoctor = `[tabtitle='${switchName}'] ngx-temperature-dragger`;

        await this.attributes.scrollIntoView(switchLoctor);
        await this.mouseInteraction.moveMouseInBoxedElement(switchLoctor, offsetX, offsetY, true);
        const ActualVal = await this.getText(switchLoctor);

        return ActualVal.includes(expectedTemp);
    };


    async acStatesSwitch(desiredState: string): Promise<boolean>  {
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
        };
        
        await this.click(stateButtonLoctor);
        const currentState = this.attributes.getAttribute("[ng-reflect-name='temperature-mode']", "ng-reflect-model");

        return (await currentState).includes(desiredState);
    };


    async tempSwitchOnOffButton(desiredState: "on" | "off"): Promise<boolean> {
        const tempSwitchLoctor = "[tabtitle='Temperature'] ngx-temperature-dragger button";
        let classAttr = await this.attributes.getAttribute(tempSwitchLoctor, "class");
        const isOnInitailly = /\bon\b/.test(classAttr ?? "");

        if (isOnInitailly && desiredState === "off" || !(isOnInitailly) && desiredState === "on"){
            await this.click(tempSwitchLoctor);
        };
        
        classAttr = await this.attributes.getAttribute(tempSwitchLoctor, "class");
        const isOnFinally = /\bon\b/.test(classAttr ?? "");

        return (desiredState === "on" && isOnFinally) || (desiredState === "off" && !(isOnFinally));
    };
};