import React from 'react'
import { Select, Button, message } from 'antd'
import FormGroup from '@components/FormGroup'
import { Link, Image, Video, Basic } from '@containers/Asides'
import utils from '@utils/index'
import style from './index.module.scss'
import Rect from '@models/Rect';

const Option = Select.Option

class Aside extends React.Component {
  constructor(props) {
    super(props)

    this.updateType = 'props'
    this.state = {
      rect: {
        id: -1,
        size: {},
        position: {},
        data: {},
        type: window.p2pAppEdit.LINK
      }
    }
  }

  setUnSelected() {
    this.setState({
      rect: {
        id: -1,
        size: {},
        position: {},
        data: {},
        type: window.p2pAppEdit.LINK
      }
    })
  }

  setSelected(_rect) {
    const rect = {
      id: _rect.id,
      size: _rect.getSize(),
      position: _rect.getPosition(),
      data: _rect.data,
      type: _rect.type
    }
    this.setState({
      rect
    })
  }

  handlerChangeType = (newVal) => {
    this.setState({
      rect: {
        ...this.state.rect,
        type: newVal
      }
    })
  }

  validate = (data) => {
    if (!data.type) { return false }
    for (let key in data) {
      if (key === 'target') { continue }
      if (data[key].trim() === '') { return false }
    }

    return true
  }

  handlerSave = (e) => {
    const form = e.target
    const data = utils.getFormData(form)
    const flag = this.validate(data)
    if (flag) {
      const {
        x, y, width, height, type, ...other
      } = data
      const newRect = new Rect({
        id: this.state.rect.id === -1 ? utils.getRandomId() : this.state.rect.id,
        x1: +x,
        y1: +y,
        x2: +x + Number(width),
        y2: +y + Number(height),
        type,
        data: other,
        selected: true
      })
      this.props.onSave(newRect)
      this.setSelected(newRect)
      message.success('操作成功！')
    } else {
      message.error('操作失败！请检查是否还有未输入的项。')
    }
    e.preventDefault()
  }

  handlerDelete = () => {
    if (this.state.rect.id === -1) {
      return
    }
    this.setUnSelected()
    this.props.onDelete(this.state.rect.id)
    message.success('删除成功！')
  }

  render() {
    const {
      rect
    } = this.state

    const Edit = (() => {
      switch (rect.type) {
        case window.p2pAppEdit.LINK: return Link
        case window.p2pAppEdit.VIDEO: return Video
        case window.p2pAppEdit.IMAGE: return Image
        default: return Link
      }
    })()

    return (
      <aside className={style.cAside}>
        <form onSubmit={this.handlerSave}>
          <Basic size={rect.size} position={rect.position}/>
          <FormGroup title='类型'>
            <Select 
              value={this.state.rect.type} 
              style={{ width: '100%' }} 
              onChange={this.handlerChangeType} >
              <Option value={window.p2pAppEdit.LINK}>链接</Option>
              <Option value={window.p2pAppEdit.VIDEO}>视频</Option>
              <Option value={window.p2pAppEdit.IMAGE}>图片</Option>
            </Select>
            <input type="hidden" name="type" value={this.state.rect.type} />
          </FormGroup>
          <div className={style.mType}>
            <Edit data={rect.data} />
          </div>
          <div className={style.mBtns}>
            { 
              rect.id === -1 ? '' : <Button type="danger" onClick={this.handlerDelete} block>删除</Button>
            }
            <Button type="primary" htmlType="submit" block>
              {
                rect.id === -1 ? '创建' : '保存'
              }
            </Button>
          </div>
        </form>
      </aside>
    )
  }
}

export default Aside