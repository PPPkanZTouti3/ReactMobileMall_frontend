import React, { Component } from 'react'
import {connect} from 'react-redux'

class NotFount extends Component {
    render(){
        return (
            <div>404</div>
        )
    }
}

export default connect()(NotFount)