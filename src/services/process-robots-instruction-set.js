import Robot from "../models/robot.js";
import World from "../models/world.js";
import processCommandString from "./process-command-string.js";

export default function processRobotsInstructionSet(input) {
  const [boundingBox, ...rows] = input.split("\n");
  const filteredRows = rows.filter((row) => row.trim() !== "");

  const world = World.createFromBoundingBox(boundingBox);

  // Iterate through the rows 2 at a time. The first row is the robot position, the second row is the commands.
  for (let i = 0; i < filteredRows.length; i += 2) {
    const position = filteredRows[i].split(" ");
    const commandString = filteredRows[i + 1].trim();

    const robot = Robot.createFromPosition(position);
    const result = processCommandString(robot, commandString, world);
    // eslint-disable-next-line no-console
    console.log(result);
  }
}
