import React from 'react'
import style from './index.module.scss'

export default class Aside extends React.Component {
  render() {
    return (
      <aside className={style.cAside}>
        <form>
          <div className={style.mFormGroup}>
            <span className={style.uFormTlt}>类型</span>
            <div className={style.mFormContent}>
              <select>
                <option>请选择类型</option>
                <option>链接</option>
                <option>视频</option>
                <option>图片</option>
              </select>
            </div>
          </div>
          <div className={style.mType}>
            <p className={style.uTypeTlt}>链接类型</p>
            <div className={style.mFormGroup}>
              <span className={style.uFormTlt}>打开方式</span>
              <div className={style.mFormContent}>
                <label>
                  <input type="radio" name="target" value='_blank'/>新窗口
                </label>
                <label>
                  <input type="radio" name="target" value=''/>当前窗口
                </label>
              </div>
            </div>
            <div className={style.mFormGroup}>
              <span className={style.uFormTlt}>跳转链接</span>
              <div className={style.mFormContent}>
                <input type="text" name="href" />
              </div>
            </div>
          </div>
          <div className={style.mType}>
            <p className={style.uTypeTlt}>视频类型</p>
            <div className={style.mFormGroup}>
              <span className={style.uFormTlt}>视频地址</span>
              <div className={style.mFormContent}>
                <input type="text" name="href" />
              </div>
            </div>
          </div>
          <div className={style.mType}>
            <p className={style.uTypeTlt}>图片类型</p>
            <div className={style.mFormGroup}>
              <span className={style.uFormTlt}>图片地址</span>
              <div className={style.mFormContent}>
                <input type="text" name="href" />
              </div>
            </div>
          </div>
        </form>
      </aside>
    )
  }
}