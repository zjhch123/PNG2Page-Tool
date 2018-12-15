import utils from '@utils/index'

class Rect {
  constructor({
    id = -1,
    x1, y1, x2, y2, 
    selected = false, 
    data = {}, 
    type = window.p2pAppEdit.LINK
  }) {
    this.id = id === -1 ? utils.getRandomId() : id
    this.x1 = Math.ceil(x1)
    this.x2 = Math.ceil(x2)
    this.y1 = Math.ceil(y1)
    this.y2 = Math.ceil(y2)

    this.width = this.x2 - this.x1
    this.height = this.y2 - this.y1

    this.area = Math.abs(this.width * this.height)

    this.selected = selected
    this.data = data
    this.type = type
    this.text = ''
    this.analyseType()
  }

  analyseType() {
    this.fillColor = Rect.FILL_COLOR
    this.strokeColor = Rect.STROKE_COLOR
    this.textColor = Rect.TEXT_COLOR
    this.text = '链接'
    switch (this.type) {
      case window.p2pAppEdit.LINK:
        this.fillColor = Rect.LINK_FILL_COLOR
        this.strokeColor = Rect.LINK_STROKE_COLOR
        this.textColor = Rect.LINK_TEXT_COLOR
        this.text = '链接'
        break
      case window.p2pAppEdit.VIDEO:
        this.fillColor = Rect.VIDEO_FILL_COLOR
        this.strokeColor = Rect.VIDEO_STROKE_COLOR
        this.textColor = Rect.VIDEO_TEXT_COLOR
        this.text = '视频'
        break
      case window.p2pAppEdit.IMAGE:
        this.fillColor = Rect.IMAGE_FILL_COLOR
        this.strokeColor = Rect.IMAGE_STROKE_COLOR
        this.textColor = Rect.IMAGE_TEXT_COLOR
        this.text = '图片'
        break
      default:
        break
    }
  }

  getPosition() {
    return {
      x: Math.min(this.x1, this.x2),
      y: Math.min(this.y1, this.y2)
    }
  }

  getSize() {
    return {
      width: Math.abs(this.width),
      height: Math.abs(this.height)
    }
  }

  resetPosition({x, y, width, height}) {
    this.x1 = Math.ceil(x)
    this.y1 = Math.ceil(y)
    this.x2 = x + width
    this.y2 = y + height
    this.width = width
    this.height = height
    this.area = Math.abs(this.width * this.height)
  }

  setData(data) {
    this.data = data
  }

  getData() {
    return this.data
  }

  delData() {
    this.data = null
  }

  calcFontSize() {
    const width = Math.abs(this.width)
    const height = Math.abs(this.height)
    
    return width / 6 > height * 0.8 ? height * .8 : width / 6
  }

  draw(ctx) {
    if (this.area < Rect.MIN_AREA) {
      return
    }

    ctx.fillStyle = this.selected ? Rect.SELECT_FILL_COLOR : this.fillColor
    ctx.strokeStyle = this.selected ? Rect.SELECT_STROKE_COLOR : this.strokeColor
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
    
    ctx.fillStyle = this.selected ? Rect.SELECT_TEXT_COLOR : this.textColor
    ctx.font = `bold ${this.calcFontSize()}px 宋体`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillText(this.text, this.x1 / 2 + this.x2 / 2, this.y1 / 2 + this.y2 /2)
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
Rect.TEXT_COLOR = `rgba(255, 255, 255, 1)`

Rect.SELECT_FILL_COLOR = `rgba(215, 20, 69, .8)`
Rect.SELECT_TEXT_COLOR = `rgba(255, 255, 255, 1)`
Rect.SELECT_STROKE_COLOR = `rgba(215, 20, 69, 1)`

Rect.VIDEO_FILL_COLOR = `rgba(255, 0, 0, .3)`
Rect.VIDEO_TEXT_COLOR = `rgba(255, 255, 255, 1)`
Rect.VIDEO_STROKE_COLOR = `rgba(255, 0, 0, 1)`

Rect.LINK_FILL_COLOR = `rgba(0, 255, 0, .3)`
Rect.LINK_TEXT_COLOR = `rgba(255, 255, 255, 1)`
Rect.LINK_STROKE_COLOR = `rgba(0, 255, 0, 1)`

Rect.IMAGE_FILL_COLOR = `rgba(0, 0, 255, .3)`
Rect.IMAGE_TEXT_COLOR = `rgba(255, 255, 255, 1)`
Rect.IMAGE_STROKE_COLOR = `rgba(0, 0, 255, 1)`

export default Rect