const nextJest = require('next/jest');

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  rootDir: './',
  moduleDirectories: ["node_modules", "<rootDir>/"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testMatch: [
     "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__test__/__mocks__/fileMock.js',
    "@/sdk/(.*)$": "<rootDir>/sdk/$1",
    "@/api": "<rootDir>/api/index",
    "@/api/(.*)$": "<rootDir>/api/$1",
    "@/sdk": "<rootDir>/sdk/index",
    "@/HOC": "<rootDir>/components/hoc/index",
    "@/components": "<rootDir>/components/index",
    "@/connectors": "<rootDir>/connectors/index",
    "@/connectors/(.*)$": "<rootDir>/connectors/$1",
    "@/constants/(.*)$": "<rootDir>/constants/$1",
    "@/constants": "<rootDir>/constants/index",
    "@/design-system": "<rootDir>/design-system",
    "@/design-system/(.*)$": "<rootDir>/design-system/$1",
    "@/state/(.*)$": "<rootDir>/state/$1",
    "@/stylin": "<rootDir>/stylin",
    "@/stylin/(.*)$": "<rootDir>/stylin/$1",
    "@/svg/(.*)$": "<rootDir>/components/svg/$1",
    "@/svg": "<rootDir>/components/svg/index",
    "@/utils/(.*)$": "<rootDir>/utils/$1",
    "@/utils": "<rootDir>/utils/index",
    "@/elements/(.*)$": "<rootDir>/elements/$1",
    "@/elements": "<rootDir>/elements/index",
    "@/hooks/(.*)$": "<rootDir>/hooks/$1",
    "@/hooks": "<rootDir>/hooks/index",
    "@/interface": "<rootDir>/interface/index",
    "@/views/(.*)$": "<rootDir>/views/$1",
  },
};

module.exports = async () => ({
  /**
   * Using ...(await createJestConfig(customJestConfig)()) to override transformIgnorePatterns
   * provided byt next/jest.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096635363
   */
  ...(await createJestConfig(customJestConfig)()),
  /**
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096698456
   * @link https://jestjs.io/docs/ecmascript-modules
   */
  transformIgnorePatterns: ['/node_modules/(?!(wagmi|@wagmi)/)'],
});
