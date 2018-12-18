import React, { Component } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Container from '@components/Container';
import Loading from '@components/Loading';
import Upload from '@containers/Upload';
import Image from '@containers/Image';
import utils from '@utils/index';
import local from '@utils/local';
import { message } from 'antd';

import './App.scss';

class App extends Component {
  constructor() {
    super()
    this.state = {
      info: null,
      isLoading: false
    }
  }

  componentDidMount() {
    if (local.hasHistory()) {
      this.loadHistory()
    }
  }

  setIsLoading = (timestamp = 1500) => {
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, timestamp)
  }

  uploadHandler = async (file) => {
    this.setIsLoading()
    const {
      width, height, image
    } = await utils.getImageFileData(file)
    try {
      local.saveImage({ image: image.src, width, height })
    } catch (e) {
      message.error('图片过大, 请重新上传')
      return
    }
    this.setState({
      info: {
        width, height, image: image.src
      }
    })
  }

  loadHistory = () => {
    this.setIsLoading()
    const data = local.getImage()
    this.setState({
      info: data.imageInfo
    })
  }

  clearHistory = () => {
    local.clearHistory()
    message.success('清除成功！')
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  renderLoading = () => this.state.isLoading ? <Loading text="正在处理图像"/> : ''

  render() {
    return (
      <div className="app">
      { this.renderLoading() }
        <Header clearHistory={this.clearHistory}/>
        <Container className="app-container" padding="8px">
          {
            !this.state.info
              ? <Upload afterUpload={this.uploadHandler}/>
              : <Image info={this.state.info} />
          }
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
