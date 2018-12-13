import React from 'react'
import { Select, Button } from 'antd'
import FormGroup from '@components/FormGroup'
import { Link, Image, Video, Basic } from '@components/Asides'

import style from './index.module.scss'

const Option = Select.Option

class Aside extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'link'
    }

    this.select = this.props.select || null
  }

  handlerTypeChange = (val) => {
    this.setState({
      type: val
    })
  }

  handlerSave = (e) => {
    console.log(e)
    e.persist()
    e.preventDefault()
  }

  render() {
    const {
      type,
    } = this.state
    return (
      <aside className={style.cAside}>
        <form onSubmit={this.handlerSave}>
          <Basic />
          <FormGroup title='类型'>
            <Select defaultValue="link" style={{ width: '100%' }} onChange={this.handlerTypeChange}>
              <Option value="link">链接</Option>
              <Option value="video">视频</Option>
              <Option value="img">图片</Option>
            </Select>
          </FormGroup>
          <div className={style.mType}>
            {
              type === 'link' && <Link />
            }
            {
              type === 'video' && <Video />
            }
            {
              type === 'img' && <Image />
            }
          </div>
          <div className={style.mBtns}>
            <Button type="danger" block>删除</Button>
            <Button type="primary" htmlType="submit" block>
              {
                this.select == null ? '创建' : '保存'
              }
            </Button>
          </div>
        </form>
      </aside>
    )
  }
}

export default Aside