export type FormType = {
    title: string;
    fields: Record<string, string>;
    checkbox?: string;
    radio?: string;
    button: string;
    xfail?: boolean;
};