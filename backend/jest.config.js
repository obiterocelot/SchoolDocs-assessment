/** @type {import('ts-jest').JestConfigWithTsJest} **/
require('dotenv').config({ path: ".env.test" })
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};