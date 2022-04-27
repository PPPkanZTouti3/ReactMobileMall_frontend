import React from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

class AuthRoute extends React.Component {
  render() {
    return (
      null
    )
  }
}
export default connect()(withRouter(AuthRoute))