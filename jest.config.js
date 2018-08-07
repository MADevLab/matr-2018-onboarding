module.exports = {
  preset: 'jest-preset-angular',
  roots: ['./src'],
  setupTestFrameworkScriptFile: '<rootDir>/src/jest.setup.ts',
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  testURL: 'http://localhost'
};
