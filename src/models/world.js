export default class World {
  #xMax;

  #yMax;

  #blacklist = new Set();

  constructor(xMax, yMax) {
    this.#xMax = xMax;
    this.#yMax = yMax;
    if (xMax < 0 || yMax < 0) {
      throw new Error("World dimensions must be non-negative.");
    }
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
