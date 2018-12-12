import React from 'react'
import style from './index.module.scss'
import utils from '@utils/index'
import Rect from '@models/Rect'
import Aside from '@containers/Aside'

export default class Image extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = null
    this.ctx = null

    this.isDrawing = false
    this.mouse = {
      x: 0,
      y: 0
    }

    this.result = []

    this.calcScale = utils.throttle(this.calcScale, 200)
  }

  async componentDidMount() {
    this.ctx = this.canvas.getContext('2d')

    const file = this.props.file
    const {
      height, image
    } = await utils.getImageData(file)

    this.image = image
    this.canvas.height = height

    utils
      .delay(200)
      .then(() => this.calcScale()) // 延迟执行保证计算正确

    this.drawPrev()
    
    window.addEventListener('resize', this.calcScale)
  }

  calcScale = () => {
    this.scale = this.canvas.width / this.canvas.offsetWidth
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcScale)
  }

  drawPrev = () => {
    this.ctx.drawImage(this.image, 0, 0)
    for (let i = 0; i < this.result.length; i++) {
      this.result[i].draw(this.ctx)
    }
  }

  startDrawing = (e) => {
    if (this.isDrawing) { return }

    this.isDrawing = true
    let {
      offsetX,
      offsetY
    } = e.nativeEvent
    this.mouse = { x: this.scale * offsetX, y: this.scale * offsetY }
    this.isDrawing = true

    this.result.forEach(r => r.selected = false)

    e.preventDefault()
  }

  drawing = (e) => {
    if (!this.isDrawing) {
      return
    }
    utils.clearCanvas(this.ctx)
    this.drawPrev()
    
    const {
      offsetX: x2,
      offsetY: y2
    } = e.nativeEvent

    new Rect({x1: this.mouse.x, y1: this.mouse.y, x2: x2 * this.scale, y2: y2 * this.scale, selected: true}).draw(this.ctx)
  }

  stopDrawing = (e) => {
    if (!this.isDrawing) {
      return
    }
    this.isDrawing = false

    const {
      offsetX: x2,
      offsetY: y2
    } = e.nativeEvent

    const rect = new Rect({
      x1: this.mouse.x,
      y1: this.mouse.y,
      x2: x2 * this.scale,
      y2: y2 * this.scale,
    })

    if (rect.area >= Rect.MIN_AREA) {
      this.result.push(rect)
    }
  }

  handlerClick = (e) => {
    const {
      offsetX: x,
      offsetY: y
    } = e.nativeEvent

    const scaled = {
      x: x * this.scale,
      y: y * this.scale
    }

    const rects = 
        this.result
          .map(r => { r.selected = false; return r; })
          .filter(rect => rect.isInner(scaled))
          .sort((r1, r2) => r1.area - r2.area)
    
    if (rects.length > 0) {
      rects[0].selected = true
    }

    this.drawPrev()
  }

  render() {
    return (
      <div className={style.cImage}>
        <div className={style.mCanvas}>
          <canvas 
            className={style.uCanvas}
            onClick={this.handlerClick}
            onMouseDown={this.startDrawing}
            onMouseMove={this.drawing}
            onMouseUp={this.stopDrawing}
            ref={(node) => this.canvas = node} 
            width="1920" />
        </div>
        <div className={style.mAside}>
          <Aside />
        </div>
      </div>
    )
  }
}