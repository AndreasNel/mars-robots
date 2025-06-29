import CommandFactory from "../models/commands/factory.js";

export default function processCommandString(robot, commandString, world) {
  let finalPosition = robot.toString();
  let isRobotPositionValid = true;
  commandString.split("").forEach((commandChar) => {
    if (
      !(
        isRobotPositionValid &&
        world.isSafeCommand(commandChar, robot.toString())
      )
    ) {
      return;
    }

    const command = CommandFactory.createCommand(commandChar, robot, world);
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
