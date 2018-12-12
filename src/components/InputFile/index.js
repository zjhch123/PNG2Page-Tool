import React from 'react'
import style from './index.module.scss'

export default ({
  children,
  className,
  ...rest
}) => (
  <div className={[style.cInputFile, className].join(' ')}>
    <input type="file" className={style.uInputFile} {...rest}/>
    <div className={style.uInner}>
      { children }
    </div>
  </div>
)