import Command from "./command";

export default class TurnLeftCommand extends Command {
  execute() {
    this.saveBackup();
    const orientations = ["N", "E", "S", "W"];
    const currentIndex = orientations.indexOf(this.robot.orientation);
    const newIndex =
      (currentIndex - 1 + orientations.length) % orientations.length;
    this.robot.orientation = orientations[newIndex];
    return true;
  }
}
