import * as PIXI from 'pixi.js';

const configs = {
  count: 1000
};

const app = new PIXI.Application(800, 600, { antialias: true });
document.body.appendChild(app.view);

class Circle {
  graphics: PIXI.Graphics = null;
  _x: number = 0;
  _y: number = 0;
  _color: number = 0;
  radius: number = 5;
  _time: number = Math.random() * 360;

  constructor(x: number, y: number, radius: number, color: number) {
    this.graphics = new PIXI.Graphics();
    this.radius = radius;
    this._x = x;
    this._y = y;
    this._color = color;
  }

  update() {
    const sin = Math.sin(this._time);
    const cos = Math.cos(this._time);
    this._time += 0.1 * Math.random();

    this._x += sin + Math.random() - 0.5;
    // this._y += cos;
  }

  draw() {
    this.graphics.clear();
    this.graphics.beginFill(this._color);
    this.graphics.drawCircle(this._x, this._y, this.radius);
    this.graphics.endFill();
  }
}

const container = new PIXI.Container();

const particles: Circle[] = [];

for (let i = 0; i < configs.count; i++) {
  const c = new Circle(
    app.view.width * Math.random(),
    app.view.height * Math.random(),
    0.2 + Math.random() * 1.5,
    0x2299ff
  );
  particles.push(c);
  container.addChild(c.graphics);
}

app.ticker.add(() => {
  particles.forEach(c => {
    c.update();
    c.draw();
  });
});

app.stage.addChild(container);
