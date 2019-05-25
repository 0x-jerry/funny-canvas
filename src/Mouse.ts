import { IVec2 } from './utils'
import { Dot } from './Dot'

export class Mouse {
  pos: IVec2 = {
    x: 0,
    y: 0
  }

  dot: Dot
  range = 100

  constructor() {
    window.onmousemove = (ev) => {
      this.pos.x = ev.x
      this.pos.y = ev.y
    }

    this.dot = new Dot(0, 0)
  }

  update() {
    this.dot.x = this.pos.x
    this.dot.y = this.pos.y
  }
}
