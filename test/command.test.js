import Command from "../src/models/commands/command.js";

describe("Command", () => {
  let robot;
  let world;

  beforeEach(() => {
    robot = { toString: jest.fn(() => "robot-state") };
    world = {};
  });

  it("should save robot backup", () => {
    class TestCommand extends Command {}
    const cmd = new TestCommand(robot, world);
    cmd.saveBackup();
    expect(cmd.backup).toBe("robot-state");
  });

  it("should throw error if execute is called directly", () => {
    const cmd = new Command(robot, world);
    expect(() => cmd.execute()).toThrow(
      "Method 'execute' must be implemented.",
    );
  });
});
