import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import Circle from './Circle';
import utils from './utils';
import TreeLine from './Tree';

const configs = {
  count: 1000,
  performance: true,
  color: '#2299ff',
  backgroundColor: '#000000',
  tree: {
    r: 200,
    y: 200,
    delta: {
      r: 0.6,
      time: 0.6,
      angle: 6,
    },
    time: 200,
  },
};

const _configs = {
  width: window.innerWidth,
  height: window.innerHeight - 5,
};

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = _configs.width;
canvas.height = _configs.height;

const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

const particles: Circle[] = [];

function initParticles(count: number) {
  if (count < particles.length) {
    return particles.splice(count);
  }

  for (let i = particles.length; i < count; i++) {
    const c = new Circle(
      (-1 * _configs.width) / 2 + Math.random() * _configs.width,
      (-1 * _configs.height) / 2 + Math.random() * _configs.height,
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
const treeGui = gui.addFolder('tree');
treeGui.open();
treeGui.add(configs.tree, 'r', 100, 300).onChange((val: number) => {
  tree.updateOptions({
    r: val,
  });
  tree1.updateOptions({
    r: val,
  });
});
treeGui.add(configs.tree, 'y', -300, 400).onChange((val: number) => {
  tree.updateOptions({
    y: val,
  });
  tree1.updateOptions({
    y: val,
  });
});
const deltaTreeGui = treeGui.addFolder('delta');
deltaTreeGui.open();
deltaTreeGui.add(configs.tree.delta, 'r', 0.1, 1).onChange((val: number) => {
  tree.updateOptions({
    delta: {
      r: val,
    },
  });
  tree1.updateOptions({
    delta: {
      r: val,
    },
  });
});
deltaTreeGui.add(configs.tree.delta, 'time', 0.1, 1).onChange((val: number) => {
  tree.updateOptions({
    delta: {
      time: val,
    },
  });
  tree1.updateOptions({
    delta: {
      time: val,
    },
  });
});
deltaTreeGui.add(configs.tree.delta, 'angle', 1, 10).onChange((val: number) => {
  tree.updateOptions({
    delta: {
      angle: val,
    },
  });
  tree1.updateOptions({
    delta: {
      angle: val,
    },
  });
});

const cam = new utils.Camera(
  _configs.width,
  _configs.height,
  _configs.height + 200,
);

const tree = new TreeLine({
  ...configs.tree,
});

const tree1 = new TreeLine({
  ...configs.tree,
  startAngle: 190,
});

function renderTree(tree: TreeLine) {
  ctx.lineWidth = 2;

  const c = configs.color.match(/[\w\d]{2}/g).map(a => parseInt(a, 16));
  tree.doWithLine((x1, y1, z1, x2, y2, z2, a) => {
    const pos1 = cam.to2d(x1, y1, z1);
    const pos2 = cam.to2d(x2, y2, z2);

    ctx.beginPath();
    ctx.strokeStyle = `rgba(${c.join(',')}, ${a + 0.2})`;
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();
  });
}

function update() {
  if (configs.performance) stats.begin();

  ctx.fillStyle = configs.backgroundColor;
  ctx.fillRect(0, 0, _configs.width, _configs.height);

  ctx.fillStyle = configs.color;
  particles.forEach(c => {
    c.update();
    const pos = cam.to2d(c.x, 100, c.y);

    if (
      pos.x > 0 &&
      pos.x < _configs.width &&
      pos.y > 0 &&
      pos.y < _configs.height
    ) {
      ctx.fillRect(pos.x, pos.y, c.radius, c.radius);
    }
  });

  renderTree(tree);
  renderTree(tree1);
  tree.update();
  tree1.update();

  if (configs.performance) stats.end();
}

setInterval(update, 1000 / 60);
