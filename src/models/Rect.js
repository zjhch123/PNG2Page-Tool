const FILL_COLOR = `rgba(95,189,249, .3)`
const STROKE_COLOR = `rgba(95,189,249, 1)`

const SELECT_FILL_COLOR = `rgba(255, 0, 0, .1)`
const SELECT_STROKE_COLOR = `rgba(255, 0, 0, .6)`

class Rect {
  constructor({x1, y1, x2, y2, selected = false}) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2

    this.width = x2 - x1
    this.height = y2 - y1

    this.area = Math.abs(this.width * this.height)

    this.selected = selected
  }

  draw(ctx) {
    if (this.area < 100) {
      return
    }

    const oldFillStyle = ctx.fillStyle
    const oldStrokeStyle = ctx.strokeStyle
    const oldLineWidth = ctx.lineWidth

    ctx.fillStyle = this.selected ? SELECT_FILL_COLOR : FILL_COLOR
    ctx.strokeStyle = this.selected ? SELECT_STROKE_COLOR : STROKE_COLOR
    ctx.lineWidth = '6'

    ctx.beginPath()
    ctx.rect(
      this.x1, 
      this.y1, 
      this.width, 
      this.height
    )
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    ctx.fillStyle = oldFillStyle
    ctx.strokeStyle = oldStrokeStyle
    ctx.lineWidth = oldLineWidth
  }

  isInner({x, y}) {
    return this.x1 >= x && this.x2 <= x && this.y1 <= y && this.y2 >= y
  }
}

export default Rect