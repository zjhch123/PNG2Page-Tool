import React from 'react'
import style from './index.module.scss'

export default () => (
  <header className={style.cHeader}>
    <span>{window.p2pAppConfig.title}</span>
  </header>
)