import CommandFactory from "../models/commands/factory.js";

class RobotLostError extends Error {}

export default function processCommandString(robot, commandString, world) {
  let finalPosition = robot.toString();
  try {
    commandString.split("").forEach((commandChar) => {
      if (!world.isSafeCommand(commandChar, robot.toString())) {
        return;
      }

      // Technically we don't need the world to be passed down.
      // If commands were refactored to return their new desired state,
      // we could just check the robot's position against the world after each command execution.
      const command = CommandFactory.createCommand(commandChar, robot, world);
      const isRobotPositionValid = command.execute();
      if (!isRobotPositionValid) {
        world.blacklistCommand(commandChar, command.backup);
        // If lost, we don't need to process any further commands for this robot.
        throw new RobotLostError(`${command.backup} LOST`);
      }
      finalPosition = robot.toString();
    });
    return finalPosition;
  } catch (error) {
    if (error instanceof RobotLostError) {
      return error.message;
    }
    throw error;
  }
}
