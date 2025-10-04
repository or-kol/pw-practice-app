import xfailConfig from '../xfailsData/xfail.json';


/**
 * Looks up xfail reason and bug info for a given spec file and test name.
 * @param specFileName The spec (test file) name (e.g. 'DatepickerPageTest.spec.ts')
 * @param testName The test title (string)
 * @returns The xfail entry if found, otherwise null.
 */
export function getXfail(specFileName: string, testName: string) {
    for (const bugId in xfailConfig) {
        const entry = xfailConfig[bugId];
        if (entry.feature === specFileName && entry.testName === testName) {
            return entry;
        }
    }
    return null;
}

/**
 * Marks a test as xfail if an entry exists for the spec file and test name.
 * @param testInfo Playwright testInfo object
 * @param specFileName The spec (test file) name (e.g. 'DatepickerPageTest.spec.ts')
 */
export function handleXfail(testInfo: any, specFileName: string) {
    const xfail = getXfail(specFileName, testInfo.title);
    if (xfail) {
        testInfo.expectedStatus = 'failed';
        testInfo.annotations.push({ type: 'xfail', description: xfail.description });
    }
    return xfail;
}
