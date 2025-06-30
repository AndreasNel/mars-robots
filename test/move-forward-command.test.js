import MoveForwardCommand from "../src/models/commands/move-forward-command.js";

describe("MoveForwardCommand", () => {
  let robot;
  let world;

  beforeEach(() => {
    robot = { x: 0, y: 0, orientation: "N" };
    world = {
      isValidPosition: jest.fn(),
      blacklistCommand: jest.fn(),
      isSafeCommand: jest.fn(),
      xMax: 5,
      yMax: 5,
    };
  });

  it("should move north", () => {
    robot.orientation = "N";
    const cmd = new MoveForwardCommand(robot, world);
    cmd.execute();
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(1);
  });

  it("should move east", () => {
    robot.orientation = "E";
    const cmd = new MoveForwardCommand(robot, world);
    cmd.execute();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(0);
  });

  it("should move south", () => {
    robot.x = 2;
    robot.y = 2;
    robot.orientation = "S";
    const cmd = new MoveForwardCommand(robot, world);
    cmd.execute();
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(1);
  });

  it("should move west", () => {
    robot.x = 2;
    robot.y = 2;
    robot.orientation = "W";
    const cmd = new MoveForwardCommand(robot, world);
    cmd.execute();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
  });

  it("should return false if not valid position", () => {
    robot.x = 0;
    robot.y = 5;
    robot.orientation = "N";
    world.isValidPosition.mockReturnValue(false);
    const cmd = new MoveForwardCommand(robot, world);
    const result = cmd.execute();
    expect(result).toBe(false);
    expect(world.isValidPosition).toHaveBeenCalled();
  });

  it("should throw an error for unknown orientation", () => {
    robot.orientation = "Q";
    const cmd = new MoveForwardCommand(robot, world);
    expect(() => cmd.execute()).toThrow("Unknown orientation: Q");
  });
});
