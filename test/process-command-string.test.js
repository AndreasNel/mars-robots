import processCommandString from "../src/services/process-command-string.js";
import CommandFactory from "../src/models/commands/factory.js";

const createMockRobot = () => {
  const robot = {};
  robot.state = "0 0 N";
  robot.toString = jest.fn(() => robot.state);
  return robot;
};

const createMockWorld = () => {
  const world = {};
  world.isSafeCommand = jest.fn(() => true);
  world.blacklistCommand = jest.fn();
  return world;
};

jest.mock("../src/models/commands/factory.js", () => ({
  __esModule: true,
  default: {
    createCommand: jest.fn(),
  },
}));

describe("processCommandString", () => {
  let robot;
  let world;

  beforeEach(() => {
    robot = createMockRobot();
    world = createMockWorld();
    CommandFactory.createCommand.mockReset();
  });

  it("returns initial position if commandString is empty", () => {
    const result = processCommandString(robot, "", world);
    expect(result).toBe(robot.state);
    expect(world.isSafeCommand).not.toHaveBeenCalled();
    expect(CommandFactory.createCommand).not.toHaveBeenCalled();
  });

  it("executes commands and updates position if valid", () => {
    // Simulate two valid commands
    const command1 = { execute: jest.fn(() => true) };
    const command2 = { execute: jest.fn(() => true) };
    CommandFactory.createCommand
      .mockReturnValueOnce(command1)
      .mockReturnValueOnce(command2);
    robot.toString
      .mockReturnValueOnce("0 0 N")
      .mockReturnValueOnce("0 1 N")
      .mockReturnValue("0 2 N");
    const result = processCommandString(robot, "FF", world);
    expect(result).toBe("0 2 N");
    expect(CommandFactory.createCommand).toHaveBeenCalledTimes(2);
    expect(command1.execute).toHaveBeenCalled();
    expect(command2.execute).toHaveBeenCalled();
  });

  it("stops and returns LOST if a command causes a robot to go out of bounds", () => {
    const command1 = { execute: jest.fn(() => true) };
    const command2 = { execute: jest.fn(() => false), backup: "0 1 N" };
    const command3 = { execute: jest.fn(() => true) };
    CommandFactory.createCommand
      .mockReturnValueOnce(command1)
      .mockReturnValueOnce(command2);
    robot.toString
      .mockReturnValueOnce("0 0 N")
      .mockReturnValueOnce("0 1 N")
      .mockReturnValue("0 2 N");
    const result = processCommandString(robot, "FF", world);
    expect(result).toBe("0 1 N LOST");
    expect(command3.execute).not.toHaveBeenCalled();
    expect(world.blacklistCommand).toHaveBeenCalledWith("F", "0 1 N");
    expect(CommandFactory.createCommand).toHaveBeenCalledTimes(2);
  });

  it("skips command if isSafeCommand returns false", () => {
    world.isSafeCommand.mockReturnValueOnce(true).mockReturnValueOnce(false);
    const command1 = { execute: jest.fn(() => true) };
    CommandFactory.createCommand.mockReturnValueOnce(command1);
    robot.toString.mockReturnValueOnce("0 0 N").mockReturnValue("0 1 N");
    const result = processCommandString(robot, "FF", world);
    expect(result).toBe("0 1 N");
    expect(CommandFactory.createCommand).toHaveBeenCalledTimes(1);
  });
});
