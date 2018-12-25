import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import Circle from './Circle';

const configs = {
  count: 1000,
  performance: true,
  color: '#2299ff',
  backgroundColor: '#000000',
};

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 5;

const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

const particles: Circle[] = [];

function initParticles(count: number) {
  particles.splice(0);
  for (let i = 0; i < count; i++) {
    const c = new Circle(
      window.innerWidth * Math.random(),
      window.innerHeight * Math.random(),
      0.2 + Math.random() * 1.5,
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
gui.add(configs, 'count', 100, 10000).onChange(initParticles);
gui.add(configs, 'performance').onChange(() => {
  stats.dom.style.display = configs.performance ? 'block' : 'none';
});
gui.addColor(configs, 'color');
gui.addColor(configs, 'backgroundColor');

function update() {
  if (configs.performance) stats.begin();

  ctx.fillStyle = configs.backgroundColor;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = configs.color;
  particles.forEach(c => {
    c.update();
    ctx.fillRect(c.x, c.y, c.radius, c.radius);
  });

  if (configs.performance) stats.end();
}

setInterval(update, 1000 / 60);
