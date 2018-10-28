import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import Header from '../components/header/Header'
import { connect } from 'react-redux'
import { toggleUserLogginStatus } from '../../redux/appState/actions'
import SiteBarAdmin from '../components/sitebar/SiteBarAdmin'

class Shortcode extends Component {

  constructor (props) {
    super(props)
  };

  toggleUserLogginStatus = () => {
    this.props.toggleUserLogginStatus(!this.props.isUserLoggedIn)
  }

  render () {
    return (
      <Container onClick={this.toggleUserLogginStatus} fluid>
        <Row>
          <Col xs="2">
            <SiteBarAdmin/>
          </Col>
          <Col xs="10">
            <Header/>
          </Col>
        </Row>
        <Row>
        </Row>
      </Container>
    )
  }
}

Shortcode.propTypes = {
  wpObject: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
  toggleUserLogginStatus: (status) => dispatch(toggleUserLogginStatus(status))
})

const mapStateToProps = state => ({
  isUserLoggedIn: state.appState.isUserLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(Shortcode)