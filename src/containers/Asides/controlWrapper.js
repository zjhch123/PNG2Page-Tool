import React from 'react'

export default (Wrapper, mappingEventToValue = (v) => v) => class extends React.Component {
  constructor(props) {
    super(props)
    this.updateType = 'props'
    this.otherProps = {}
    this.state = {
      value: null
    }
  }

  shouldComponentUpdate(newProps, newState) {
    if (this.state.value !== newState.value) {
      this.updateType = 'state'
      return true
    }
    if (this.props.value !== newProps.value) {
      this.updateType = 'props'
      return true
    }
    return false
  }

  componentDidUpdate() {
    this.setState({
      value: this.updateType === 'props' ? this.props.value : this.state.value
    })
  }

  componentDidMount() {
    const {
      value,
      ...otherProps
    } = this.props
    this.otherProps = otherProps
    this.setState({
      value
    })
  }

  valueChange = (e) => {
    const value = mappingEventToValue(e)
    this.setState({
      value
    })
    if (!!this.props.afterValueChange) {
      this.props.afterValueChange(value)
    }
  }

  render() {
    return (
      <Wrapper {...this.otherProps} value={this.state.value} onChange={this.valueChange}/>
    )
  }
}