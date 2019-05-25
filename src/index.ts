import * as dat from 'dat.gui'
import * as Stats from 'stats.js'
import canvasUtils from './canvas'
import { Dot } from './Dot'
import { Mouse } from './Mouse'

const stats = new Stats()
const gui = new dat.GUI()

const configs = {
  mouse: {
    range: 100
  },
  dot: {
    color: [0, 153, 255],
    size: 4
  },
  line: {
    color: [0, 150, 255]
  }
}

Dot.size = configs.dot.size

gui.add(configs.mouse, 'range', 100, 200).onChange((val) => {
  mouse.range = val
  Dot.range = val
})

const dotGui = gui.addFolder('dot')
dotGui.open()
dotGui.addColor(configs.dot, 'color')
dotGui.add(configs.dot, 'size', 1, 5).onChange((val) => {
  Dot.size = val
})

const lineGui = gui.addFolder('line')
lineGui.open()
lineGui.addColor(configs.line, 'color')

document.body.append(canvasUtils.canvas)
document.body.append(stats.dom)

canvasUtils.render()
canvasUtils.stats = stats

const mouse = new Mouse()

mouse.range = configs.mouse.range
Dot.range = mouse.range

const dots: Dot[] = [mouse.dot]

for (let i = 0; i < 100; i++) {
  const speed = 0.1 + Math.random() * 0.5

  const dot = new Dot(Math.random() * Math.PI * 2, speed)

  dots.push(dot)
}

canvasUtils.registerRender((ctx) => {
  ctx.fillStyle = `rgb(${configs.dot.color.join(',')})`

  dots.forEach((dot) => {
    // lines
    dots.forEach((d) => {
      const dis = Dot.Distance(dot, d)
      if (dis <= mouse.range) {
        const c = 255 * (dis / mouse.range)
        const color = `rgb(${configs.line.color.map((lc) => lc + c).join(',')})`

        canvasUtils.line(
          [
            {
              x: dot.x,
              y: dot.y
            },
            {
              x: d.x,
              y: d.y
            }
          ],
          color
        )
      }
    })

    mouse.update()
    dot.update()
    dot.constraint(mouse.pos, mouse.range - 10, 10)
    dot.render(ctx)
  })
})
