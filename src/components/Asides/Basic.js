import React from 'react'
import { InputNumber } from 'antd'
import FormGroup from '@components/FormGroup'

import style from './Basic.module.scss'

export default () => (
  <div>
    <div className={style.mType}>
      <p>位置</p>
      <div className={style.mRow}>
        <FormGroup title='&nbsp;x：' fontSize="12px" inline={true}>
          <InputNumber name="position.x" size="small" />
        </FormGroup>
        <FormGroup title='&nbsp;y：' fontSize="12px" inline={true}>
          <InputNumber name="position.y" size="small" />
        </FormGroup>
      </div>
    </div>
    <div className={style.mType}>
      <p>大小</p>
      <div className={style.mRow}>
        <FormGroup title='宽：' fontSize="12px" inline={true}>
          <InputNumber name="size.w" size="small" />
        </FormGroup>
        <FormGroup title='高：' fontSize="12px" inline={true}>
          <InputNumber name="size.h" size="small" />
        </FormGroup>
      </div>
    </div>
  </div>
)