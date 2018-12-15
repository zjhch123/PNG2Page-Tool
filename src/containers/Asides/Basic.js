import React from 'react'
import { InputNumber } from 'antd'
import FormGroup from '@components/FormGroup'
import controlWrapper from './controlWrapper'
import style from './Basic.module.scss'

const WrapperInput = controlWrapper(InputNumber)

export default ({size, position}) => {
  return (
    <div>
      <div className={style.mType}>
        <p>位置</p>
        <div className={style.mRow}>
          <FormGroup title='&nbsp;x：' fontSize="12px" inline={true}>
            <WrapperInput name="x" size="small" value={position.x} />
          </FormGroup>
          <FormGroup title='&nbsp;y：' fontSize="12px" inline={true}>
            <WrapperInput name="y" size="small" value={position.y} />
          </FormGroup>
        </div>
      </div>
      <div className={style.mType}>
        <p>大小</p>
        <div className={style.mRow}>
          <FormGroup title='宽：' fontSize="12px" inline={true}>
            <WrapperInput name="width" size="small" value={size.width} />
          </FormGroup>
          <FormGroup title='高：' fontSize="12px" inline={true}>
            <WrapperInput name="height" size="small" value={size.height} />
          </FormGroup>
        </div>
      </div>
    </div>
  )
}