module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__test__/__mocks__/fileMock.js',
    "@/sdk/(.*)$": "<rootDir>/sdk/$1",
    "@/sdk": "<rootDir>/sdk/index",
    "@/constants/(.*)$": "<rootDir>/constants/$1",
    "@/constants": "<rootDir>/constants/index",
    "@/svg/(.*)$": "<rootDir>/components/svg/$1",
    "@/svg": "<rootDir>/components/svg/index",
    "@/utils/(.*)$": "<rootDir>/utils/$1",
    "@/utils": "<rootDir>/utils/index",
    "@/elements/(.*)$": "<rootDir>/elements/$1",
    "@/elements": "<rootDir>/elements/index",
    "@/hooks/(.*)$": "<rootDir>/hooks/$1",
    "@/hooks": "<rootDir>/hooks/index",
  },
  moduleDirectories: ['node_modules']
};
