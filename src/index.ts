import * as dat from 'dat.gui';
import * as Stats from 'stats.js';

const configs = {
  count: 1000,
  performance: true,
};

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 5;

const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

class Circle {
  _x: number = 0;
  _y: number = 0;
  _color: number = 0;
  radius: number = 5;
  _time: number = Math.random() * 360;

  constructor(x: number, y: number, radius: number, color: number) {
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
    this._y += cos;
  }

  draw() {
    const mid = this.radius / 2;
    ctx.fillRect(this._x - mid, this._y + mid, this.radius, this.radius);
  }
}

const particles: Circle[] = [];

function initParticles(count: number) {
  particles.splice(0);
  for (let i = 0; i < count; i++) {
    const c = new Circle(
      window.innerWidth * Math.random(),
      window.innerHeight * Math.random(),
      0.2 + Math.random() * 1.5,
      0x2299ff,
    );
    particles.push(c);
  }
}

initParticles(configs.count);

const stats = new Stats();
stats.showPanel(0);
stats.dom.style.display = configs.performance ? 'block' : 'none';
document.body.append(stats.dom);

const gui = new dat.GUI();
gui.add(configs, 'count', 100, 3000).onChange(initParticles);
gui.add(configs, 'performance').onChange(() => {
  stats.dom.style.display = configs.performance ? 'block' : 'none';
});

function update() {
  particles.forEach(c => {
    c.update();
    c.draw();
  });
}

setInterval(() => {
  stats.begin();
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = '#2299ff';
  update();
  stats.end();
}, 1000 / 60);
