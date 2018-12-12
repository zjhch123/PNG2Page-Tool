import React, { Component } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Container from '@components/Container';
import Loading from '@components/Loading';
import Upload from '@containers/Upload';
import Image from '@containers/Image';

import './App.scss';

class App extends Component {
  constructor() {
    super()
    this.state = {
      file: null,
      isLoading: false
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

  uploadHandler = (file) => {
    this.setIsLoading()
    this.setState({
      file,
    })
  }

  renderLoading = () => this.state.isLoading ? <Loading text="正在处理图像"/> : ''

  render() {
    return (
      <div className="app">
      {/* { this.renderLoading() } */}
        <Header />
        <Container className="app-container" padding="8px">
          {
            !this.state.file
              ? <Upload afterUpload={this.uploadHandler}/>
              : <Image file={this.state.file} />
          }
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
