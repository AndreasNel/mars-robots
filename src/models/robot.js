export default class Robot {
  x;

  y;

  orientation;

  constructor(x, y, orientation) {
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
