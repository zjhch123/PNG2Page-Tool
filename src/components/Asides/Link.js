import React from 'react'
import { Radio, Input } from 'antd'
import FormGroup from '@components/FormGroup'

const RadioGroup = Radio.Group

export default () => (
  <div>
    <FormGroup title='打开方式'>
      <RadioGroup>
        <Radio value="_blank">新窗口打开</Radio>
        <Radio value="">当前窗口打开</Radio>
      </RadioGroup>
    </FormGroup>
    <FormGroup title="跳转链接">
      <Input placeholder="请输入跳转链接, 推荐使用https" />
    </FormGroup>
  </div>
)