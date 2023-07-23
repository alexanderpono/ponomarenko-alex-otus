// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'ui-src/**/*.ts',
        '!ui-src/app.ts',
        '!ui-src/**/index.ts',
        '!ui-src/**/*.d.ts'
    ],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/internals/jestSettings.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
    },
    moduleNameMapper: {}
};
