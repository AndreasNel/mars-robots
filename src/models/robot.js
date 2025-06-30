export default class Robot {
  x;

  y;

  orientation;

  constructor(x, y, orientation) {
    // Not adding type checking here because we're OK with losing robots due to bad configuration/commands.
    this.x = x;
    this.y = y;
    this.orientation = orientation;
  }

  toString() {
    return `${this.x} ${this.y} ${this.orientation}`;
  }

  static createFromPosition(position) {
    const x = parseInt(position[0], 10);
    const y = parseInt(position[1], 10);
    const orientation = position[2];
    return new Robot(x, y, orientation);
  }
}
