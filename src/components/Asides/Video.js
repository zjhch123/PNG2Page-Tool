import React from 'react'
import { Input } from 'antd'
import FormGroup from '@components/FormGroup'

export default () => (
  <div>
    <FormGroup title="视频地址">
      <Input placeholder="请输入视频地址, 推荐使用https" />
    </FormGroup>
  </div>
)