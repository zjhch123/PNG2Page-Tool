class Rect {
  constructor({x1, y1, x2, y2, selected = false}) {
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2

    this.width = x2 - x1
    this.height = y2 - y1

    this.area = Math.abs(this.width * this.height)

    this.selected = selected
  }

  draw(ctx) {
    if (this.area < Rect.MIN_AREA) {
      return
    }

    const oldFillStyle = ctx.fillStyle
    const oldStrokeStyle = ctx.strokeStyle
    const oldLineWidth = ctx.lineWidth

    ctx.fillStyle = this.selected ? Rect.SELECT_FILL_COLOR : Rect.FILL_COLOR
    ctx.strokeStyle = this.selected ? Rect.SELECT_STROKE_COLOR : Rect.STROKE_COLOR
    ctx.lineWidth = Rect.LINE_WIDTH

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
    let minX, minY, maxX, maxY

    [minX, maxX] = [Math.min(this.x1, this.x2), Math.max(this.x1, this.x2)];
    [minY, maxY] = [Math.min(this.y1, this.y2), Math.max(this.y1, this.y2)];

    return minX <= x && maxX >= x && minY <= y && maxY >= y
  }
}

Rect.MIN_AREA = 1000

Rect.LINE_WIDTH = 5

Rect.FILL_COLOR = `rgba(95,189,249, .3)`
Rect.STROKE_COLOR = `rgba(95,189,249, 1)`

Rect.SELECT_FILL_COLOR = `rgba(215, 20, 69, .8)`
Rect.SELECT_STROKE_COLOR = `rgba(215, 20, 69, 1)`

export default Rect