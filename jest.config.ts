import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  coverageReporters: ['text-summary', 'lcov'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),

  preset: 'ts-jest',

  testEnvironment: 'node',

  testMatch: ['**/*.spec.ts']
}
