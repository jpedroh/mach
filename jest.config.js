module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  projects: ["<rootDir>/packages/**/jest.config.js"],
  testEnvironment: "node",
  testMatch: ["*.test.ts", "*.spec.ts", "*.spec.tsx"],
};
