export type RenderFunc = (ctx: CanvasRenderingContext2D) => void
export type CanvasDrawStyle = string | CanvasGradient | CanvasPattern

export interface IVec2 {
  x: number
  y: number
}

class CanvasUtils {
  canvas: HTMLCanvasElement = document.createElement('canvas')
  configs = {
    height: window.innerHeight,
    width: window.innerWidth
  }

  private ctx: CanvasRenderingContext2D = null
  private renders: RenderFunc[] = []
  private enable = true

  constructor() {
    this.canvas.width = this.configs.width
    this.canvas.height = this.configs.height
    this.ctx = this.canvas.getContext('2d')

    this._render = this._render.bind(this)
  }

  registerRender(func: RenderFunc) {
    this.renders.push(func)
  }

  render() {
    if (this.enable) {
      window.requestAnimationFrame(this._render)
    }
  }

  clear() {
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  line(positions: IVec2[], style?: CanvasDrawStyle) {
    const ctx = this.ctx
    if (style) ctx.strokeStyle = style

    ctx.beginPath()

    positions.forEach((pos, i) => {
      if (i === 0) {
        ctx.moveTo(pos.x, pos.y)
      } else {
        ctx.lineTo(pos.x, pos.y)
      }
    })

    ctx.stroke()
  }

  rect(posStart: IVec2, posEnd: IVec2, style?: CanvasDrawStyle) {
    if (style) this.ctx.strokeStyle = style

    const w = posEnd.x - posStart.x
    const h = posEnd.y - posStart.y
    this.ctx.fillRect(posStart.x, posStart.y, w, h)
  }

  circle(center: IVec2, radius: number, style?: CanvasDrawStyle) {
    const ctx = this.ctx

    if (style) ctx.strokeStyle = style

    ctx.beginPath()
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    ctx.stroke()
  }

  private _render() {
    this.clear()
    this.renders.forEach((func) => func(this.ctx))
  }
}

const canvasUtils = new CanvasUtils()

export default canvasUtils
