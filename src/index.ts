import * as dat from 'dat.gui'
import * as Stats from 'stats.js'
import canvasUtils from './canvas'

document.body.append(canvasUtils.canvas)

canvasUtils.render()

canvasUtils.registerRender((ctx) => {
  canvasUtils.line(
    [
      {
        x: 20,
        y: 40
      },
      {
        x: 80,
        y: 100
      },
      {
        x: 100,
        y: 200
      },
      {
        x: 20,
        y: 40
      }
    ],
    '#000'
  )

  canvasUtils.circle({ x: 150, y: 50 }, 40)
})
