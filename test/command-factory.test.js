import CommandFactory from "../src/models/commands/factory.js";
import MoveForwardCommand from "../src/models/commands/move-forward-command.js";
import TurnLeftCommand from "../src/models/commands/turn-left-command.js";
import TurnRightCommand from "../src/models/commands/turn-right-command.js";

class MockRobot {}
class MockWorld {}

const COMMANDS = [
  { symbol: "F", expectedClass: MoveForwardCommand },
  { symbol: "L", expectedClass: TurnLeftCommand },
  { symbol: "R", expectedClass: TurnRightCommand },
];

describe("CommandFactory", () => {
  COMMANDS.forEach(({ symbol, expectedClass }) => {
    it(`should create ${expectedClass.name} for ${symbol}`, () => {
      const cmd = CommandFactory.createCommand(
        symbol,
        new MockRobot(),
        new MockWorld(),
      );
      expect(cmd).toBeInstanceOf(expectedClass);
    });
  });

  it("should throw for unknown command", () => {
    expect(() =>
      CommandFactory.createCommand("X", new MockRobot(), new MockWorld()),
    ).toThrow("Unknown command: X");
  });
});
