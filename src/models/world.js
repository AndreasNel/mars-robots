export default class World {
  #xMax;

  #yMax;

  #blacklist = new Set();

  constructor(xMax, yMax) {
    // Adding type checking here because everything in the world derives their state from the world setup.
    // Having a broken world has a cascading effect on all robots and commands.
    if (
      typeof xMax !== "number" ||
      typeof yMax !== "number" ||
      Number.isNaN(xMax) ||
      Number.isNaN(yMax)
    ) {
      throw new Error("World dimensions must be valid numbers.");
    }
    if (xMax < 0 || yMax < 0) {
      throw new Error("World dimensions must be non-negative.");
    }
    this.#xMax = xMax;
    this.#yMax = yMax;
  }

  isValidPosition(x, y) {
    return x >= 0 && x <= this.#xMax && y >= 0 && y <= this.#yMax;
  }

  blacklistCommand(commandChar, robotPosition) {
    this.#blacklist.add(`${robotPosition} ${commandChar}`);
  }

  isSafeCommand(commandChar, robotPosition) {
    return !this.#blacklist.has(`${robotPosition} ${commandChar}`);
  }

  static createFromBoundingBox(boundingBox) {
    const [xMax, yMax] = boundingBox.split(" ").map(Number);
    return new World(xMax, yMax);
  }
}
