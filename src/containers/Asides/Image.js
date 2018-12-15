import React from 'react'
import { Input } from 'antd'
import FormGroup from '@components/FormGroup'
import controlWrapper from './controlWrapper'

const WrapperInput = controlWrapper(Input, (e) => e.target.value)

export default ({data}) => (
  <div>
    <FormGroup title="图片地址">
      <WrapperInput value={data.src || ''} name="src" placeholder="请输入视频地址, 推荐使用https" />
    </FormGroup>
  </div>
)