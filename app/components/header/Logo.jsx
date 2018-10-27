import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'

class Logo extends Component {
  render () {
    return (
      <div className="header-logo">
        <img src={this.props.logoUrl} alt="..." class="img-thumbnail"/>
      </div>
    )
  }
}

const mapDispatchToProps = ({})

const mapStateToProps = state => ({
  logoUrl: state.appState.logoUrl
})

export default connect(mapStateToProps, mapDispatchToProps)(Logo)
