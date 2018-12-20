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
    }
  }

  componentDidMount() {
    if (local.hasHistory()) {
      this.loadHistory()
    }
  }

  uploadHandler = async (file) => {
    Loading.start('正在加载')
    const {
      width, height, image
    } = await utils.getImageFileData(file)
    Loading.stop()
    try {
      local.saveImage({ image: image, width, height })
    } catch (e) {
      message.error('图片过大, 请压缩后重新上传')
      console.error(e)
      return
    }
    this.setState({
      info: {
        width, height, image: image
      }
    })
  }

  loadHistory = () => {
    Loading.start('正在加载', 1500)
    this.setState({
      info: local.getImage()
    })
  }

  render() {
    return (
      <div className="app">
        <Header/>
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
