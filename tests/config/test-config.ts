/**
 * Test configuration constants
 */
export const TEST_PATHS = {
  /** Directory where test screenshots are saved */
  SCREENSHOTS: 'test-results/testImages',
  /** Directory for test reports */
  REPORTS: 'test-results/reports',
  /** Directory for test data files */
  TEST_DATA: 'D:/PersonalPrograming/Typescript/PlaywrightCourse/pw-practice-app/tests/data'
} as const;

export const TEST_TIMEOUTS = {
  /** Default action timeout in milliseconds */
  ACTION: 5000,
  /** Page load timeout in milliseconds */
  PAGE_LOAD: 30000
} as const;