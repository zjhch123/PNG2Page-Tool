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
    this.state = {
      image: null
    }
  }

  async componentDidMount() {
    this.ctx = this.canvas.getContext('2d')

    const file = this.props.file
    const {
      width, height, image
    } = await utils.getImageData(file)

    this.image = image
    this.setState({ image })
    this.canvas.height = this.canvas.width / width * height

    this.drawPrev()
    window.addEventListener('resize', this.calcScale)

    await utils.delay(200)
    this.calcScale()
  }

  calcScale = () => {
    this.scale = this.canvas.width / this.canvas.offsetWidth
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcScale)
  }

  drawPrev = () => {
    utils.clearCanvas(this.ctx)
    this.result.sort((r1, r2) => r2.area - r1.area).forEach(r => r.draw(this.ctx))
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
      selected: true
    })

    if (rect.area >= Rect.MIN_AREA) {
      this.result.push(rect)
      this.setSelected(rect)
    } else {
      this.setUnSelected()
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

    const rects = this.result
            .map(r => { r.selected = false; return r; })
            .filter(rect => rect.isInner(scaled))
            .sort((r1, r2) => r1.area - r2.area)
    
    if (rects.length > 0) {
      rects[0].selected = true
      this.setSelected(rects[0])
    } else {
      this.setUnSelected()
    }

    this.drawPrev()
  }

  setSelected = (rect) => {
    this.aside.setSelected(rect)
  }

  setUnSelected = () => {
    this.aside.setUnSelected()
  }
  
  handlerAsideSave = (rect) => {
    this.result = this.result.filter(r => r.id !== rect.id)
    this.result.push(rect)
    this.drawPrev()
  }

  handlerAsideDelete = (id) => {
    this.result = this.result.filter(r => r.id !== id)
    this.drawPrev()
  }

  render() {
    return (
      <div className={style.cImage}>
        <div className={style.mCanvas}>
          <img alt="canvas" src={!!this.state.image ? this.state.image.src : ''} className={style.uImg}/>
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
          <Aside 
            ref={(node) => this.aside = node} 
            onSave={this.handlerAsideSave}
            onDelete={this.handlerAsideDelete}
            />
        </div>
      </div>
    )
  }
}