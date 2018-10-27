import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import Header from '../components/header/Header'

export default class Shortcode extends Component {
  render () {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Header/>
          </Col>
        </Row>
        <div>
          <h1>WP Reactivate Frontend</h1>
          <p>Title: {this.props.wpObject.title}</p>
        </div>
      </Container>
    )
  }
}

Shortcode.propTypes = {
  wpObject: PropTypes.object
}