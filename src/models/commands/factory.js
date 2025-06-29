import MoveForwardCommand from "./move-forward-command.js";
import TurnLeftCommand from "./turn-left-command.js";
import TurnRightCommand from "./turn-right-command.js";

export default class CommandFactory {
  static createCommand(commandChar, robot, world) {
    if (commandChar === "F") {
      return new MoveForwardCommand(robot, world);
    }
    if (commandChar === "L") {
      return new TurnLeftCommand(robot, world);
    }
    if (commandChar === "R") {
      return new TurnRightCommand(robot, world);
    }
    throw new Error(`Unknown command: ${commandChar}`);
  }
}
