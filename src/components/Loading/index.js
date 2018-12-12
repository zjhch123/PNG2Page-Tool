import React from 'react'
import style from './index.module.scss'

export default ({
  text = '正在装载'
}) => (
  <div className={style.cLoading}>
    <div className={style.uIcon}>
      <svg width="46" height="46" viewBox="0 0 1024 1024">
        <path d="M329.6 512v0c0-11.2-8-19.2-19.2-19.2h-259.2c-11.2 0-19.2 8-19.2 19.2v0c0 11.2 8 19.2 19.2 19.2h257.6c11.2 0 20.8-8 20.8-19.2z" fill="currentColor"></path>
        <path d="M353.6 603.2v0c-4.8-9.6-17.6-12.8-27.2-6.4l-224 129.6c-8 4.8-11.2 16-6.4 25.6v0c4.8 9.6 17.6 12.8 27.2 6.4l224-129.6c8-4.8 11.2-16 6.4-25.6z" fill="currentColor"></path>
        <path d="M420.8 670.4v0c-9.6-4.8-20.8-1.6-27.2 6.4l-129.6 224c-4.8 9.6-1.6 20.8 6.4 27.2v0c9.6 4.8 20.8 1.6 27.2-6.4l129.6-224c6.4-9.6 3.2-22.4-6.4-27.2z" fill="currentColor"></path>
        <path d="M512 694.4v0c-11.2 0-19.2 8-19.2 19.2v257.6c0 11.2 8 19.2 19.2 19.2v0c11.2 0 19.2-8 19.2-19.2v-257.6c0-9.6-8-19.2-19.2-19.2z" fill="currentColor"></path>
        <path d="M630.4 676.8c-4.8-9.6-17.6-12.8-27.2-6.4v0c-9.6 4.8-12.8 17.6-6.4 27.2l129.6 224c4.8 9.6 17.6 12.8 27.2 6.4v0c9.6-4.8 12.8-17.6 6.4-27.2l-129.6-224z" fill="currentColor"></path>
        <path d="M920 724.8l-224-129.6c-9.6-4.8-20.8-1.6-27.2 6.4v0c-4.8 9.6-1.6 20.8 6.4 27.2l224 129.6c9.6 4.8 20.8 1.6 27.2-6.4v0c6.4-9.6 3.2-20.8-6.4-27.2z" fill="currentColor"></path>
        <path d="M972.8 492.8h-259.2c-11.2 0-19.2 8-19.2 19.2v0c0 11.2 8 19.2 19.2 19.2h257.6c11.2 0 19.2-8 19.2-19.2v0c1.6-11.2-6.4-19.2-17.6-19.2z" fill="currentColor"></path>
        <path d="M670.4 420.8v0c4.8 9.6 17.6 12.8 27.2 6.4l224-129.6c9.6-4.8 12.8-17.6 6.4-27.2v0c-4.8-9.6-17.6-12.8-27.2-6.4l-224 129.6c-8 6.4-11.2 17.6-6.4 27.2z" fill="currentColor"></path>
        <path d="M603.2 353.6v0c9.6 4.8 20.8 1.6 27.2-6.4l129.6-224c4.8-9.6 1.6-20.8-8-27.2v0c-9.6-4.8-20.8-1.6-27.2 6.4l-129.6 224c-4.8 9.6-1.6 22.4 8 27.2z" fill="currentColor"></path>
        <path d="M512 32v0c-11.2 0-19.2 8-19.2 19.2v257.6c0 11.2 8 19.2 19.2 19.2v0c11.2 0 19.2-8 19.2-19.2v-257.6c0-11.2-8-19.2-19.2-19.2z" fill="currentColor"></path>
        <path d="M299.2 104c-6.4-9.6-17.6-12.8-27.2-8v0c-9.6 4.8-12.8 17.6-6.4 27.2l129.6 224c4.8 9.6 17.6 12.8 27.2 6.4v0c9.6-4.8 12.8-17.6 6.4-27.2l-129.6-222.4z" fill="currentColor"></path>
        <path d="M104 299.2l224 129.6c9.6 4.8 20.8 1.6 27.2-6.4v0c4.8-9.6 1.6-20.8-6.4-27.2l-224-129.6c-11.2-6.4-22.4-3.2-28.8 6.4v0c-4.8 9.6-1.6 20.8 8 27.2z" fill="currentColor"></path>
      </svg>
    </div>
    <p className={style.uText}>{text}</p>
  </div>
)