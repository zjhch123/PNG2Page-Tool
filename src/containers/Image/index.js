import React from 'react'
import style from './index.module.scss'
import utils from '@utils'
import Rect from '@models/Rect'

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

    this.resizeFunc = utils.throttle(this.resizeFunc, 200)
  }

  async componentDidMount() {
    this.ctx = this.canvas.getContext('2d')

    const file = this.props.file
    const {
      height, image
    } = await utils.getImageData(file)

    this.image = image
    this.canvas.height = height

    setTimeout(() => {
      this.scale = this.canvas.width / this.canvas.offsetWidth // 等待动画执行结束后再计算
    }, 800)

    this.drawPrev()
    
    window.addEventListener('resize', this.resizeFunc)
  }

  resizeFunc = () => {
    this.scale = this.canvas.width / this.canvas.offsetWidth
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunc)
  }

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
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

    e.preventDefault()
  }

  drawing = (e) => {
    if (!this.isDrawing) {
      return
    }
    this.clearCanvas()
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
    this.result.push(new Rect({
      x1: this.mouse.x,
      y1: this.mouse.y,
      x2: x2 * this.scale,
      y2: y2 * this.scale,
    }))
  }

  render() {
    return (
      <div className={style.cImage}>
        <canvas 
          onClick={this.handlerClick}
          onMouseDown={this.startDrawing}
          onMouseMove={this.drawing}
          onMouseUp={this.stopDrawing}
          ref={(node) => this.canvas = node} 
          width="1920" />
      </div>
    )
  }
}