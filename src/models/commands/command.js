export default class Command {
  robot;

  world;

  backup;

  constructor(robot, world) {
    this.robot = robot;
    this.world = world;
  }

  saveBackup() {
    this.backup = this.robot.toString();
  }

  // eslint-disable-next-line class-methods-use-this
  execute() {
    throw new Error("Method 'execute' must be implemented.");
  }
}
