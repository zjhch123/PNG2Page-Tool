import React from 'react'
import style from './index.module.scss'

export default ({ title = '', children, className = '', inline = false, fontSize = "14px" }) => (
  <div className={[style.cFormGroup, className, inline ? style.fInline : ''].join(' ')}>
    <p style={{fontSize: fontSize}} className={style.uFormTlt}>{title}</p>
    <div className={style.mFormContent}>
      { children }
    </div>
  </div>
)