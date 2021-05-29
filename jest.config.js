module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/mock.ts',
    '\\.(png)$': '<rootDir>/__mocks__/mock.ts',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}