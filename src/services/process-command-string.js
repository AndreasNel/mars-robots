import MoveForwardCommand from "../models/commands/move-forward-command";
import TurnLeftCommand from "../models/commands/turn-left-command";
import TurnRightCommand from "../models/commands/turn-right-command";

export default function processCommandString(robot, commandString, world) {
  let finalPosition = robot.toString();
  let isRobotPositionValid = true;
  commandString.forEach((commandChar) => {
    if (
      !isRobotPositionValid ||
      !world.isSafeCommand(commandChar, robot.toString())
    ) {
      return;
    }

    let command;
    if (commandChar === "F") {
      command = new MoveForwardCommand(robot, world);
    } else if (commandChar === "L") {
      command = new TurnLeftCommand(robot, world);
    } else if (commandChar === "R") {
      command = new TurnRightCommand(robot, world);
    } else {
      throw new Error(`Unknown command: ${commandChar}`);
    }
    isRobotPositionValid = command.execute();

    if (isRobotPositionValid) {
      finalPosition = robot.toString();
    } else {
      world.blacklistCommand(commandChar, command.backup);
      finalPosition = `${command.backup} LOST`;
    }
  });
  return finalPosition;
}
