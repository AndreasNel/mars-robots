import CommandFactory from "../src/models/commands/factory.js";
import MoveForwardCommand from "../src/models/commands/move-forward-command.js";
import TurnLeftCommand from "../src/models/commands/turn-left-command.js";
import TurnRightCommand from "../src/models/commands/turn-right-command.js";

class MockRobot {}
class MockWorld {}

describe("CommandFactory", () => {
  it("should create MoveForwardCommand for F", () => {
    const cmd = CommandFactory.createCommand(
      "F",
      new MockRobot(),
      new MockWorld(),
    );
    expect(cmd).toBeInstanceOf(MoveForwardCommand);
  });

  it("should create TurnLeftCommand for L", () => {
    const cmd = CommandFactory.createCommand(
      "L",
      new MockRobot(),
      new MockWorld(),
    );
    expect(cmd).toBeInstanceOf(TurnLeftCommand);
  });

  it("should create TurnRightCommand for R", () => {
    const cmd = CommandFactory.createCommand(
      "R",
      new MockRobot(),
      new MockWorld(),
    );
    expect(cmd).toBeInstanceOf(TurnRightCommand);
  });

  it("should throw for unknown command", () => {
    expect(() =>
      CommandFactory.createCommand("X", new MockRobot(), new MockWorld()),
    ).toThrow("Unknown command: X");
  });
});
