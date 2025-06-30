import TurnRightCommand from "../src/models/commands/turn-right-command.js";

class MockRobot {
  constructor(orientation) {
    this.orientation = orientation;
  }
}

class MockWorld {}

const turnCases = [
  { from: "N", to: "E" },
  { from: "E", to: "S" },
  { from: "S", to: "W" },
  { from: "W", to: "N" },
];

describe("TurnRightCommand", () => {
  turnCases.forEach(({ from, to }) => {
    it(`should turn ${from} to ${to}`, () => {
      const robot = new MockRobot(from);
      const cmd = new TurnRightCommand(robot, new MockWorld());
      cmd.execute();
      expect(robot.orientation).toBe(to);
    });
  });
});
