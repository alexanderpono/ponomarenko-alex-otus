module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'jsx', 'js'],
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jestSetupFile.js'],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/(?!react-file-drop)'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '\\.(ts|tsx)$': [
      'ts-jest',
      {
        babel: true,
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  modulePaths: ['src'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  testPathIgnorePatterns: ['\\.snap$', '\\.sass$', '<rootDir>/node_modules/'],
  cacheDirectory: '.jest/cache',
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
  ],
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
};
