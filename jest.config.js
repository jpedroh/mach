"use strict";

module.exports = {
  collectCoverage: !!process.env.CI,
  collectCoverageFrom: ["packages/**/src/*.ts"],
  roots: ["<rootDir>/packages"],
  testEnvironment: "node",
  preset: "ts-jest",
  verbose: !!process.env.CI,
  moduleNameMapper: {
    "@mach-flight-planning/(.*)": "<rootDir>/packages/$1/src/index.ts",
  },
};
