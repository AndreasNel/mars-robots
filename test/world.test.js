import World from "../src/models/world.js";

describe("World", () => {
  describe("constructor", () => {
    it("should create a world with valid dimensions", () => {
      const world = new World(5, 3);
      expect(world.isValidPosition(0, 0)).toBe(true);
      expect(world.isValidPosition(5, 3)).toBe(true);
    });

    it("should throw if xMax or yMax is negative", () => {
      expect(() => new World(-1, 3)).toThrow();
      expect(() => new World(5, -1)).toThrow();
    });

    it("should throw if xMax or yMax is NaN", () => {
      expect(() => new World(NaN, 3)).toThrow();
      expect(() => new World(5, NaN)).toThrow();
      expect(() => new World(NaN, NaN)).toThrow();
    });
  });

  describe("isValidPosition", () => {
    const world = new World(5, 3);

    it("should return true for valid positions", () => {
      expect(world.isValidPosition(0, 0)).toBe(true);
      expect(world.isValidPosition(5, 3)).toBe(true);
    });

    it("should return false for out-of-bounds positions", () => {
      expect(world.isValidPosition(-1, 0)).toBe(false);
      expect(world.isValidPosition(0, -1)).toBe(false);
      expect(world.isValidPosition(6, 0)).toBe(false);
      expect(world.isValidPosition(0, 4)).toBe(false);
    });

    it("should return false if x or y is NaN", () => {
      expect(world.isValidPosition(NaN, 0)).toBe(false);
      expect(world.isValidPosition(0, NaN)).toBe(false);
      expect(world.isValidPosition(NaN, NaN)).toBe(false);
    });
  });

  describe("blacklistCommand and isSafeCommand", () => {
    let world;
    beforeEach(() => {
      world = new World(5, 3);
    });

    it("should mark a command as unsafe after blacklisting", () => {
      const pos = "1 2 N";
      world.blacklistCommand("F", pos);
      expect(world.isSafeCommand("F", pos)).toBe(false);
    });

    it("should return true for safe commands", () => {
      const pos = "1 2 N";
      expect(world.isSafeCommand("F", pos)).toBe(true);
    });
  });

  describe("createFromBoundingBox", () => {
    it("should create a World instance from a bounding box string", () => {
      const world = World.createFromBoundingBox("5 3");
      expect(world).toBeInstanceOf(World);
      expect(world.isValidPosition(5, 3)).toBe(true);
    });

    it("should throw if bounding box is invalid", () => {
      expect(() => World.createFromBoundingBox("a b")).toThrow();
      expect(() => World.createFromBoundingBox("")).toThrow();
    });
  });
});
