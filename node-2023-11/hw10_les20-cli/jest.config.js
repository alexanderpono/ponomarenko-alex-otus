// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: 'temp/coverage',
    collectCoverage: true,
    collectCoverageFrom: [
        'temp/build/**/*.js',
        '!src/**/*.ts',
        '!src/app.ts',
        '!src/**/index.ts',
        '!src/**/*.d.ts',
        '!src/cards/**/*.ts',
    ],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/internals/jestSettings.js'],
    transform: {
        '^.+\\.(js|ts)$': '<rootDir>/node_modules/babel-jest'
    },
    moduleNameMapper: {
    },
    testTimeout: 10000
};
