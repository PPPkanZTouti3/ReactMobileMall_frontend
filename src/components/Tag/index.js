import React, { Component } from 'react'
import './tag.scss'
export default class Tag extends Component {
  render() {
    return (
      <span className="tag" {...this.props}>
        {this.props.children}
      </span>
    )
  }
}
