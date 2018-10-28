import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'

class Logo extends Component {
  render () {
    return (
      <div className="sitebar-logo">
        <img src={this.props.logoUrl} alt="..." className="img-thumbnail"/>
      </div>
    )
  }
}

const mapDispatchToProps = ({})

const mapStateToProps = state => ({
  logoUrl: state.appState.logoUrl
})

export default connect(mapStateToProps, mapDispatchToProps)(Logo)
