import React from 'react'
import ReactDOM from 'react-dom'
import style from './index.module.scss'

const CONTAINER_CLASS = 'Loading-Container'

class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      text: ''
    }
  }

  componentDidMount() {
    this.setState({
      text: this.props.text
    })
  }

  hide() {
    this.setState({
      show: false
    })
  }

  update(text) {
    this.setState({
      text
    })
  }

  render() {
    return (
      <div className={[style.cLoading, this.state.show ? style.fShow : style.fHide].join(' ')}>
        <span className={style.uIcon} alt="loading"></span>
        <span className={style.uText}>{this.state.text}</span>
      </div>
    )
  }
}

export default {
  start(text = '正在加载', timeout = -1) {
    if (!!this.element) {
      return
    }
    
    this.element = null
    this.container = null

    this.container = document.createElement('div')
    this.container.classList.add(CONTAINER_CLASS)
    document.body.appendChild(this.container)

    ReactDOM.render(
      <Loading text={text} ref={n => this.element = n}/>, 
      this.container
    )

    if (timeout !== -1) {
      setTimeout(() => {
        this.stop()
      }, timeout)
    }
  },
  update(text) {
    if (!this.element) {
      return
    }
    this.element.update(text)
  },
  stop() {
    if (!this.element) {
      return
    }
    this.element.hide()
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(this.container)
      document.body.removeChild(this.container)
      this.element = null
      this.container = null
    }, 500)
  }
}