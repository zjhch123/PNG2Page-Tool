import React from 'react';
import { Button, Popconfirm, message } from 'antd'
import style from './index.module.scss'
import local from '@utils/local'

const clearHistory = () => {
  local.clearHistory()
  message.success('清除成功！')
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

export default () => (
  <header className={style.cHeader}>
    <span>{window.p2pAppConfig.title}</span>
    <div className={style.mBtns}>
      <Popconfirm placement="bottomRight" title={"清除成功后页面会刷新。确定要清除吗？"} onConfirm={clearHistory} okText="确定" cancelText="取消">
        <Button size="default" type="primary">清除缓存</Button>
      </Popconfirm>
    </div>
  </header>
)