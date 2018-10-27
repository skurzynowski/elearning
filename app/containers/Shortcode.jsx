import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import Header from '../components/header/Header'
import { connect } from 'react-redux'
import { toggleUserLogginStatus } from '../../redux/appState/actions'

class Shortcode extends Component {

  constructor(props) {
    super(props);
  };

  toggleUserLogginStatus = () => {
    this.props.toggleUserLogginStatus(!this.props.isUserLoggedIn)
  }

  render () {
    return (
      <Container onClick={this.toggleUserLogginStatus} fluid>
        <Row>
          <Col>
            <Header/>
          </Col>
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