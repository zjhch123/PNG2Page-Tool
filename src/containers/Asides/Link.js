import React from 'react'
import { Radio, Input } from 'antd'
import FormGroup from '@components/FormGroup'
import controlWrapper from './controlWrapper'

const RadioGroup = controlWrapper(Radio.Group, (e) => e.target.value)
const WrapperInput = controlWrapper(Input, (e) => e.target.value)

export default ({data = {}}) => (
  <div>
    <FormGroup title='打开方式'>
      <RadioGroup name="target" value={data.target || '_blank'}>
        <Radio value="_blank">新窗口打开</Radio>
        <Radio value="">当前窗口打开</Radio>
      </RadioGroup>
    </FormGroup>
    <FormGroup title="跳转链接">
      <WrapperInput 
        value={data.href || ''} 
        name="href" 
        placeholder="请输入跳转链接, 推荐使用https" />
    </FormGroup>
  </div>
)