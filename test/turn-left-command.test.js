import TurnLeftCommand from "../src/models/commands/turn-left-command.js";

class MockRobot {
  constructor(orientation) {
    this.orientation = orientation;
  }
}

class MockWorld {}

const turnCases = [
  { from: "N", to: "W" },
  { from: "W", to: "S" },
  { from: "S", to: "E" },
  { from: "E", to: "N" },
];

describe("TurnLeftCommand", () => {
  turnCases.forEach(({ from, to }) => {
    it(`should turn ${from} to ${to}`, () => {
      const robot = new MockRobot(from);
      const cmd = new TurnLeftCommand(robot, new MockWorld());
      cmd.execute();
      expect(robot.orientation).toBe(to);
    });
  });
});
