// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.(ts|tsx)',
        '!src/**/*.types.ts',
        '!src/types.ts',
        '!src/**/*.stories.tsx',
        '!src/app.tsx',
        '!src/**/index.tsx',
        '!src/**/index.ts',
        '!src/store/store.ts',
        '!src/**/*.d.ts',
    ],
    testEnvironment: 'jsdom',
    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Test Report',
                outputPath: './temp/testResult.html',
            },
        ],
    ],
    setupFilesAfterEnv: ['<rootDir>/internals/jestSettings.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/internals/__mocks__/styleMock.js',
        '\\.(scss)$': 'identity-obj-proxy',
    },
    testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[t]s?(x)" ]
};
