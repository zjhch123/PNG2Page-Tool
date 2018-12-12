import React from 'react'
import style from './index.module.scss'

export default ({
  padding,
  children,
  className,
  ...rest
}) => {
  return (
    <div className={[style.cContainer, className].join(' ')} style={{padding}} {...rest}>
      { children }
    </div>
  )
}