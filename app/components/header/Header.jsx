import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'

export default class Header extends Component {
  render () {
    return (
      <Container  fluid>
        <Row>
          <Col className="d-flex header-wraper">
            <div>test</div>
            <div>test</div>
            <div>test</div>
          </Col>
        </Row>
      </Container>
    )
  }
}

