import xfailConfig from '../xfailsData/xfail.json';

/**
 * Type for xfail entry, representing a test expected to fail.
 * - feature: The spec file name.
 * - testName: The test title.
 * - description: Reason or bug info for the xfail.
 */
interface XfailEntry {
    feature: string;
    testName: string;
    description: string;
    [key: string]: any;
};

/**
 * Preprocess xfailConfig into a lookup map for fast O(1) access.
 * Each entry is keyed by "specFileName|testName" for quick retrieval during test runs.
 */
const xfailLookup: Record<string, XfailEntry> = {};
for (const bugId in xfailConfig) {
    const entry = xfailConfig[bugId] as XfailEntry;
    const key = `${entry.feature}|${entry.testName}`;
    xfailLookup[key] = entry;
};

/**
 * Looks up xfail reason and bug info for a given spec file and test name.
 * @param specFileName The spec (test file) name (e.g. 'DatepickerPageTest.spec.ts')
 * @param testName The test title string
 * @returns The matching xfail entry if found, otherwise null.
 */
export function getXfail(specFileName: string, testName: string): XfailEntry | null {
    const key = `${specFileName}|${testName}`;
    return xfailLookup[key] || null;
};


/**
 * Marks a Playwright test as expected to fail if an xfail entry exists for the spec file and test name.
 * Adds an annotation and sets expectedStatus to 'failed'.
 * @param testInfo Playwright testInfo object
 * @param specFileName The name of the spec (test) file (e.g. 'DatepickerPageTest.spec.ts')
 * @returns The xfail entry if found, otherwise null.
 */
export function handleXfail(testInfo: any, specFileName: string): XfailEntry | null {
    const xfail = getXfail(specFileName, testInfo.title);
    if (xfail) {
        testInfo.expectedStatus = 'failed';
        testInfo.annotations.push({ type: 'xfail', description: xfail.description });
    };
    return xfail;
};
