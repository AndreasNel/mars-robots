import Command from "./command.js";

export default class TurnLeftCommand extends Command {
  execute() {
    this.saveBackup();
    // Changing the order here lets us use the same algorithm as TurnRightCommand
    const orientations = ["N", "W", "S", "E"];
    const currentIndex = orientations.indexOf(this.robot.orientation);
    const newIndex = (currentIndex + 1) % orientations.length;
    this.robot.orientation = orientations[newIndex];
    return true;
  }
}
