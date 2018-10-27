import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'

class UserPanel extends Component {
  render () {
    return (
      <div className="header-user-panel">
        <p>{this.props.userName} {this.props.userSurname}</p>
      </div>
    )
  }
}

const mapDispatchToProps = ({})

const mapStateToProps = state => ({
  userName: state.appState.userName,
  userSurname: state.appState.userSurname
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)
