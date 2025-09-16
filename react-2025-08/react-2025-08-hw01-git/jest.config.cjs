// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    collectCoverage: true,
    collectCoverageFrom: [
        '*.js'
    ],
    testEnvironment: 'node',
    transform: {
        '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest'
    },
    moduleNameMapper: {
    },
};
