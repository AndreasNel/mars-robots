/* eslint-disable no-console */
import { readFile } from "fs/promises";
import processRobotsInstructionSet from "./services/process-robots-instruction-set.js";

const input = process.argv[2];
if (!input) {
  console.log("Usage: node src/index.js <file-path>");
  console.log("Please provide a file path to process robots.");
  process.exit(1);
}

try {
  const data = await readFile(input, "utf8");
  processRobotsInstructionSet(data);
} catch (err) {
  console.error(`Error reading file: ${err.message}`);
  process.exit(1);
}
