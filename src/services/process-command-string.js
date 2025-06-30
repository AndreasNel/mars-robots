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
      // No need to process further commands if the robot is already lost or the command is blacklisted.
      return;
    }

    // Technically we don't need the world to be passed down.
    // If commands were refactored to return their new desired state,
    // we could just check the robot's position against the world after each command execution.
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
