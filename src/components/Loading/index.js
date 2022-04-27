import React, { Component } from 'react'
import {ActivityIndicator} from 'antd-mobile'
import './loading.scss'

export default class componentName extends Component {
  render() {
    return (
      <div className="loading">
        <ActivityIndicator></ActivityIndicator>
        <span>加载中</span>
      </div>
    )
  }
}
