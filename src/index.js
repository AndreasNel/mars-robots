/* eslint-disable no-console */
import { pathToFileURL } from "url";
import Robot from "./models/robot.js";
import World from "./models/world.js";
import processCommandString from "./services/process-command-string.js";

function processRobots(input) {
  const [boundingBox, ...rows] = input.split("\n");
  const filteredRows = rows.filter((row) => row.trim() !== "");

  const world = World.createFromBoundingBox(boundingBox);

  // Iterate through the rows 2 at a time. The first row is the robot position, the second row is the commands.
  for (let i = 0; i < filteredRows.length; i += 2) {
    const position = filteredRows[i].split(" ");
    const commandString = filteredRows[i + 1].trim();

    const robot = Robot.createFromPosition(position);
    const result = processCommandString(robot, commandString, world);
    console.log(result);
  }
}

// If this file is imported as a module, it will not execute the processing function.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  // Read the file path from command line arguments if provided, otherwise print help text.
  const input = process.argv[2];
  if (!input) {
    console.log("Usage: node src/index.js <file-path>");
    console.log("Please provide a file path to process robots.");
    process.exit(1);
  }

  import("fs")
    .then(async (fs) => {
      try {
        const data = await fs.promises.readFile(input, "utf8");
        processRobots(data);
      } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error(`Error importing fs module: ${err.message}`);
      process.exit(1);
    });
}
