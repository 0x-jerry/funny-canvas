interface IDelta {
  r?: number;
  y?: number;
  angle?: number;
}

export default class TreeLine {
  r: number = 30;
  y: number = -20;
  delta: IDelta = {
    r: 1,
    angle: 10,
    y: 1,
  };

  lines: number[] = [];
  _startAngle = -90;

  constructor(r: number, delta: IDelta, y: number = 20) {
    this.r = r;
    this.delta = Object.assign({}, this.delta, delta);
    this.y = y;

    this._init();
  }

  _init() {
    let r = this.r;
    let y = this.y;
    let angle = this._startAngle;

    while (r > 0) {
      const x1 = r * Math.sin(angle);
      y -= this.delta.y;
      const y1 = y;
      const z1 = r * Math.cos(angle);
      const a1 = (Math.cos(angle) + 1) / 2;

      angle += (Math.PI / 180) * this.delta.angle;

      const x2 = r * Math.sin(angle);
      y -= this.delta.y;
      const y2 = y;
      const z2 = r * Math.cos(angle);

      this.lines.push(x1, y1, z1, a1, x2, y2, z2);
      r -= this.delta.r;
    }
  }

  doWithLine(
    func: (
      x1: number,
      y1: number,
      z1: number,
      x2: number,
      y2: number,
      z2: number,
      alpha: number,
    ) => void,
  ) {
    const max = this.lines.length;
    let lineIndex = 0;

    while (7 * lineIndex < max) {
      const x1 = this.lines[7 * lineIndex + 0];
      const y1 = this.lines[7 * lineIndex + 1];
      const z1 = this.lines[7 * lineIndex + 2];

      const a = this.lines[7 * lineIndex + 3];

      const x2 = this.lines[7 * lineIndex + 4];
      const y2 = this.lines[7 * lineIndex + 5];
      const z2 = this.lines[7 * lineIndex + 6];

      lineIndex++;
      func(x1, y1, z1, x2, y2, z2, a);
    }
  }

  update() {
    let r = this.r;
    let y = this.y;
    let angle = this._startAngle;
    const max = this.lines.length;
    let lineIndex = 0;

    while (7 * lineIndex < max) {
      this.lines[7 * lineIndex + 0] = r * Math.sin(angle);
      y -= this.delta.y;
      this.lines[7 * lineIndex + 1] = y;
      this.lines[7 * lineIndex + 2] = r * Math.cos(angle);
      this.lines[7 * lineIndex + 3] = (Math.cos(angle) + 1) / 2;

      angle += (Math.PI / 180) * this.delta.angle;

      this.lines[7 * lineIndex + 4] = r * Math.sin(angle);
      y -= this.delta.y;
      this.lines[7 * lineIndex + 5] = y;
      this.lines[7 * lineIndex + 6] = r * Math.cos(angle);
      lineIndex++;

      r -= this.delta.r;
    }
  }
}
