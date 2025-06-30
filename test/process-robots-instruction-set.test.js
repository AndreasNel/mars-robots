import processRobotsInstructionSet from "../src/services/process-robots-instruction-set.js";
import Robot from "../src/models/robot.js";
import World from "../src/models/world.js";
import processCommandString from "../src/services/process-command-string.js";

jest.mock("../src/models/robot.js", () => ({
  __esModule: true,
  default: { createFromPosition: jest.fn() },
}));
jest.mock("../src/models/world.js", () => ({
  __esModule: true,
  default: { createFromBoundingBox: jest.fn() },
}));
jest.mock("../src/services/process-command-string.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("processRobotsInstructionSet", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should process a single robot and command", () => {
    const input = "5 3\n1 1 E\nRFRFRFRF";
    const mockWorld = {};
    const mockRobot = {};
    World.createFromBoundingBox.mockReturnValue(mockWorld);
    Robot.createFromPosition.mockReturnValue(mockRobot);
    processCommandString.mockReturnValue("1 1 E");
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    processRobotsInstructionSet(input);

    expect(World.createFromBoundingBox).toHaveBeenCalledWith("5 3");
    expect(Robot.createFromPosition).toHaveBeenCalledWith(["1", "1", "E"]);
    expect(processCommandString).toHaveBeenCalledWith(
      mockRobot,
      "RFRFRFRF",
      mockWorld,
    );
    expect(logSpy).toHaveBeenCalledWith("1 1 E");
    logSpy.mockRestore();
  });

  it("should process multiple robots and commands", () => {
    const input = "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL";
    const mockWorld = {};
    const mockRobot1 = {};
    const mockRobot2 = {};
    World.createFromBoundingBox.mockReturnValue(mockWorld);
    Robot.createFromPosition
      .mockReturnValueOnce(mockRobot1)
      .mockReturnValueOnce(mockRobot2);
    processCommandString
      .mockReturnValueOnce("1 1 E")
      .mockReturnValueOnce("3 3 N");
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    processRobotsInstructionSet(input);

    expect(Robot.createFromPosition).toHaveBeenCalledTimes(2);
    expect(processCommandString).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("1 1 E");
    expect(logSpy).toHaveBeenCalledWith("3 3 N");
    logSpy.mockRestore();
  });

  it("should skip empty lines in input", () => {
    const input = "5 3\n\n1 1 E\nRFRFRFRF\n\n";
    const mockWorld = {};
    const mockRobot = {};
    World.createFromBoundingBox.mockReturnValue(mockWorld);
    Robot.createFromPosition.mockReturnValue(mockRobot);
    processCommandString.mockReturnValue("1 1 E");
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    processRobotsInstructionSet(input);

    expect(Robot.createFromPosition).toHaveBeenCalledTimes(1);
    expect(processCommandString).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("1 1 E");
    logSpy.mockRestore();
  });
});
