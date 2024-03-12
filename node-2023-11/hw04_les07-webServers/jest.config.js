// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: 'temp/coverage',
    collectCoverage: true,
    collectCoverageFrom: [
        'api-tests/*.js'
    ],
    testEnvironment: 'node',
    transform: {
        '^.+\\.(js|ts)$': '<rootDir>/node_modules/babel-jest'
    },
    moduleNameMapper: {},
    testMatch: ['**/?(*.)+(spec|test).[t|j]s']
};
