import Robot from "../src/models/robot.js";

describe("Robot", () => {
  describe("toString", () => {
    it("should return the correct string representation", () => {
      const robot = new Robot(3, 4, "N");
      expect(robot.toString()).toBe("3 4 N");
    });
  });

  describe("createFromPosition", () => {
    it("should create a Robot instance from a valid position array", () => {
      const position = ["1", "2", "E"];
      const robot = Robot.createFromPosition(position);
      expect(robot).toBeInstanceOf(Robot);
      expect(robot.x).toBe(1);
      expect(robot.y).toBe(2);
      expect(robot.orientation).toBe("E");
    });

    it("should handle floating point numbers as x and y", () => {
      const position = ["1.7", "2.3", "W"];
      const robot = Robot.createFromPosition(position);
      expect(robot.x).toBe(1);
      expect(robot.y).toBe(2);
      expect(robot.orientation).toBe("W");
    });

    it("should handle non-numeric strings as x and y", () => {
      const position = ["foo", "bar", "S"];
      const robot = Robot.createFromPosition(position);
      expect(robot.x).toBeNaN();
      expect(robot.y).toBeNaN();
      expect(robot.orientation).toBe("S");
    });
  });
});
