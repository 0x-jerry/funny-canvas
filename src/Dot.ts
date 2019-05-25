import { IVec2 } from './utils'

export class Dot {
  x = 0
  y = 0

  dir = {
    x: 0,
    y: 0
  }

  angle = 0
  speed = 0
  static size = 3
  static range = 100

  static Distance(d1: IVec2, d2: IVec2) {
    const x = d1.x - d2.x
    const y = d1.y - d2.y
    return Math.sqrt(x ** 2 + y ** 2)
  }

  constructor(angle: number, speed: number) {
    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * window.innerHeight
    this.speed = speed
    this.angle = angle
    this.updateDir()
  }
  constraint(center: IVec2, len: number, gap: number) {
    const dis = Dot.Distance(center, this)
    const angle = Math.atan((center.y - this.y) / (center.x - this.x))
    if (dis >= len && dis <= len + gap) {
      const times = 4
      const dir = {
        x: this.speed * times * Math.cos(angle),
        y: this.speed * times * Math.sin(angle)
      }
      if (center.x > this.x) {
        this.x += dir.x
        this.y += dir.y
      } else {
        this.x -= dir.x
        this.y -= dir.y
      }
    }
  }
  inRange(d: IVec2) {
    return Dot.Distance(this, d) <= Dot.range
  }
  update() {
    if (this.x <= 0 || this.x >= innerWidth) {
      this.dir.x = -1 * this.dir.x
    } else if (this.y <= 0 || this.y >= innerHeight) {
      this.dir.y = -1 * this.dir.y
    }
    this.x += this.dir.x
    this.y += this.dir.y
  }
  updateDir() {
    this.dir.x = this.speed * Math.cos(this.angle)
    this.dir.y = this.speed * Math.sin(this.angle)
  }

  render(ctx: CanvasRenderingContext2D) {
    const size = Dot.size
    ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size)
  }
}
