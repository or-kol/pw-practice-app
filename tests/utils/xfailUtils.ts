import xfailConfig from '../xfailsData/xfail.json';

/**
 * Looks up xfail reason and bug info for a given test name.
 * @param _specFileName The spec (test file) name (unused, for compatibility)
 * @param testName The unique test identifier (test title)
 * @returns The xfail entry if found, otherwise null.
 */
export function getXfail(_specFileName: string, testName: string) {
    return xfailConfig[testName] || null;
}

/**
 * Marks a test as xfail if an entry exists for the test name.
 * @param testInfo Playwright testInfo object
 * @param specFileName The spec (test file) name (for compatibility)
 */
export function handleXfail(testInfo: any, specFileName: string) {
    const xfail = getXfail(specFileName, testInfo.title);
    if (xfail) {
        testInfo.expectedStatus = 'failed';
        testInfo.annotations.push({ type: 'xfail', description: xfail.description });
    }
    return xfail;
}
