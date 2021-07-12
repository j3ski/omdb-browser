import { config } from "dotenv";

config({ path: __dirname + "/.env.test" });

const jestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
};

export default jestConfig;
