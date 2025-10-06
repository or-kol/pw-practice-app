
export class Logger {
    /**
     * Logs an error message to the console when an operation fails unexpectedly.
     * @param operation - Description of the operation that failed.
     * @param error - The error object or message.
     */
    static logError(operation: string, error: any): void {
        console.error(`${operation} failed:`, error);
    };

    /**
     * Logs a warning message to the console for validation or operational warnings.
     * @param message - The warning message to log.
     */
    static logWarning(message: string): void {
        console.warn(message);
    };
};