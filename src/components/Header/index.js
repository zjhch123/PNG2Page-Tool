import React from 'react';
import { Button, Popconfirm } from 'antd'
import style from './index.module.scss';

export default ({ clearHistory }) => (
  <header className={style.cHeader}>
    <span>{window.p2pAppConfig.title}</span>
    <div className={style.mBtns}>
      <Popconfirm placement="bottomRight" title={"清除成功后页面会刷新。确定要清除吗？"} onConfirm={clearHistory} okText="确定" cancelText="取消">
        <Button size="default" type="primary">清除缓存</Button>
      </Popconfirm>
    </div>
  </header>
)