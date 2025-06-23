import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FormLayoutsPage extends BasePage {
    
    constructor(page: Page){
        super(page);
    };


    /**
     * Fills the "Inline form" with the provided name and email.
     * @param {string} name - The name to fill in the form.
     * @param {string} email - The email to fill in the form.
     * @returns {Promise<boolean>} - Returns true if the form was submitted successfully, false otherwise.
     */
    async fillInlineForm(name: string, email: string): Promise<boolean> {
        const inlinFormLocator = "nb-card:has-text('Inline form')";
        
        await this.fill(`${inlinFormLocator} input[placeholder="Jane Doe"]`, name);
        await this.fill(`${inlinFormLocator} input[placeholder="Email"]`, email);
        await this.check(`${inlinFormLocator} nb-checkbox :text-is("Remember me")`);
        await this.click(`${inlinFormLocator} button:has-text("SUBMIT")`);

        const formClass = await this.getAttribute(`${inlinFormLocator} form`, "class");
        return formClass?.includes("ng-submitted") ?? false;
    };


    /**
     * Fills the "Using The Grid" form with the provided email and password.
     * @param {string} email - The email to fill in the form.
     * @param {string} password - The password to fill in the form.
     * @returns {Promise<boolean>} - Returns true if the form was submitted successfully, false otherwise.
     */
    async fillUsingTheGridForm(email: string, password: string): Promise<boolean> {
        const usingTheGridLocator = "nb-card:has-text('Using The Grid')";
        
        await this.fill(`${usingTheGridLocator} input[placeholder="Email"]`, email);
        await this.fill(`${usingTheGridLocator} input[placeholder="Password"]`, password);
        await this.click(`${usingTheGridLocator} nb-radio :text-is("Option 2")`);
        await this.click(`${usingTheGridLocator} button:has-text("SIGN IN")`);

        const formClass = await this.getAttribute(`${usingTheGridLocator} form`, "class");
        return formClass?.includes("ng-submitted") ?? false;
    };


    /**
     * Fills the "Basic form" with the provided email and password.
     * @param {string} email - The email to fill in the form.
     * @param {string} password - The password to fill in the form.
     * @returns {Promise<boolean>} - Returns true if the form was submitted successfully, false otherwise.
     */
    async fillBasicForm(email: string, password: string): Promise<boolean> {
        const inlinFormLocator = "nb-card:has-text('Basic form')";
        
        await this.fill(`${inlinFormLocator} input[placeholder="Email"]`, email);
        await this.fill(`${inlinFormLocator} input[placeholder="Password"]`, password);
        await this.check(`${inlinFormLocator} nb-checkbox :text-is("Check me out")`);
        await this.click(`${inlinFormLocator} button:has-text("SUBMIT")`);

        const formClass = await this.getAttribute(`${inlinFormLocator} form`, "class");
        return formClass?.includes("ng-submitted") ?? false;
    };

    
    /**
     * Fills the "Block form" with the provided first name, last name, email, and website.
     * @param {string} firstName - The first name to fill in the form.
     * @param {string} lastName - The last name to fill in the form.
     * @param {string} email - The email to fill in the form.
     * @param {string} website - The website to fill in the form.
     * @returns {Promise<boolean>} - Returns true if the form was submitted successfully, false otherwise.
     */
    async fillBlockForm(firstName: string, lastName: string, email: string, website: string): Promise<boolean> {
        const blockFormLocator = "nb-card:has-text('Block form')";
        
        await this.fill(`${blockFormLocator} input[placeholder="First Name"]`, firstName);
        await this.fill(`${blockFormLocator} input[placeholder="Last Name"]`, lastName);
        await this.fill(`${blockFormLocator} input[placeholder="Email"]`, email);
        await this.fill(`${blockFormLocator} input[placeholder="Website"]`, website);
        await this.click(`${blockFormLocator} button:has-text("SUBMIT")`);

        const formClass = await this.getAttribute(`${blockFormLocator} form`, "class");
        return formClass?.includes("ng-submitted") ?? false;
    };


    /**
     * Fills the "Form without labels" with the provided recipients, subject, and message.
     * @param {string} recipients - The recipients to fill in the form.
     * @param {string} subject - The subject to fill in the form.
     * @param {string} message - The message to fill in the form.
     * @returns {Promise<boolean>} - Returns true if the form was submitted successfully, false otherwise.
     */
    async fillFormWithoutLabels(recipients: string, subject: string, message: string): Promise<boolean> {
        const formWithoutLabelsLocator = "nb-card:has-text('Form without labels')";
        
        await this.fill(`${formWithoutLabelsLocator} input[placeholder="Recipients"]`, recipients);
        await this.fill(`${formWithoutLabelsLocator} input[placeholder="Subject"]`, subject);
        await this.fill(`${formWithoutLabelsLocator} textarea[placeholder="Message"]`, message);
        await this.click(`${formWithoutLabelsLocator} button:has-text("SEND")`);

        const formClass = await this.getAttribute(`${formWithoutLabelsLocator} form`, "class");
        return formClass?.includes("ng-submitted") ?? false;
    };


    /**
     * Fills the "Horizontal form" with the provided email and password.
     * @param {string} email - The email to fill in the form.
     * @param {string} password - The password to fill in the form.
     * @returns {Promise<boolean>} - Returns true if the form was submitted successfully, false otherwise.
     */
    async fillHorizonttalForm(email: string, password: string): Promise<boolean> {
        const horizontalFormLocator = "nb-card:has-text('Horizontal form')";
        
        await this.fill(`${horizontalFormLocator} input[placeholder="Email"]`, email);
        await this.fill(`${horizontalFormLocator} input[placeholder="Password"]`, password);
        await this.check(`${horizontalFormLocator} nb-checkbox :text-is("Remember me")`);
        await this.click(`${horizontalFormLocator} button:has-text("SIGN IN")`);

        const formClass = await this.getAttribute(`${horizontalFormLocator} form`, "class");
        return formClass?.includes("ng-submitted") ?? false;
    };
}