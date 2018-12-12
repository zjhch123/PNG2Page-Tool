import React from 'react'
import style from './index.module.scss'

import InputFile from '@components/InputFile'

export default class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDragging: false
    }
  }

  afterUpload = (file) => {
    this.props.afterUpload(file)
  }

  handlerChange = (e) => {
    if (!!e.target.files && e.target.files.length > 0) {
      this.afterUpload(e.target.files[0])
    }
  }

  handlerDragEnter = () => {
    this.setState({
      isDragging: true
    })
  }

  handlerDragEnd = () => {
    this.setState({
      isDragging: false
    })
  }

  handlerDrop = (e) => {
    this.setState({
      isDragging: false
    })
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image')) {
        this.afterUpload(file)
      }
    }
    e.preventDefault()
  }

  render() {
    return (
      <div className={style.cUpload}>
        <div className={style.mBorder}>
          <InputFile 
            accept="image/png, image/jpeg, image/jpg"
            onChange={this.handlerChange}
            onDragEnter={this.handlerDragEnter}
            onDragEnd={this.handlerDragEnd}
            onDragLeave={this.handlerDragEnd}
            onDrop={this.handlerDrop}
            className={style.mInputFile}>
            <div className={style.mInputFileInner}>
              <div className={style.uIcon}>
                <svg viewBox="0 0 1024 1024" data-icon="inbox" width="80px" height="80px" fill="currentColor" aria-hidden="true"><path d="M885.2 446.3l-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0 0 60.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43l-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z"></path></svg>
              </div>
              {
                this.state.isDragging 
                  ? 
                    <div className={style.uText1}>{ window.p2pAppConfig.uploadDraggingTitle }</div>
                  : 
                    <div>
                      <div className={style.uText1}>{ window.p2pAppConfig.uploadTitle }</div>
                      <div className={style.uText2}>{ window.p2pAppConfig.uploadSubTitle }</div>
                    </div>
              }
            </div>
          </InputFile>
        </div>
      </div>
    )
  }
}