export default class Circle {
  x: number = 0;
  y: number = 0;
  radius: number = 5;
  _time: number = Math.random() * 360;

  constructor(x: number, y: number, radius: number) {
    this.radius = radius;
    this.x = x;
    this.y = y;
  }

  update() {
    const sin = Math.sin(this._time);
    const cos = Math.cos(this._time);
    this._time += 0.1 * Math.random();

    this.x += sin + Math.random() - 0.5;
    this.y += cos;
  }
}
