import React from 'react'
import style from './index.module.scss'

export default () => (
  <footer className={style.cFooter}>
    <span>{window.p2pAppConfig.footer}</span>
  </footer>
)