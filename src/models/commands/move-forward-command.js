import Command from "./command.js";

export default class MoveForwardCommand extends Command {
  execute() {
    this.saveBackup();

    let { x, y } = this.robot;

    switch (this.robot.orientation) {
      case "N":
        y += 1;
        break;
      case "E":
        x += 1;
        break;
      case "S":
        y -= 1;
        break;
      case "W":
        x -= 1;
        break;
      default:
        throw new Error(`Unknown orientation: ${this.robot.orientation}`);
    }

    this.robot.x = x;
    this.robot.y = y;
    return this.world.isValidPosition(x, y);
  }
}
