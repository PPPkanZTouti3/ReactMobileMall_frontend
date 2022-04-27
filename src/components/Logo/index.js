import React, { Component } from 'react'
import svg from './logo.svg'
import './logo.less'

export default class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
        
        <img src={svg} alt="logo"/>
        
      </div>
    )
  }
}
