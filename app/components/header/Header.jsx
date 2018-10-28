import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import CourseTitle from './CourseTitle'
import ProgressBar from './ProgressBar'
import UserPanel from './UserPanel'

export default class Header extends Component {
  render () {
    return (
      <Container fluid>
        <Row>
          <Col className="d-flex header-wraper">
            <CourseTitle/>
            <ProgressBar/>
            <UserPanel/>
          </Col>
        </Row>
      </Container>
    )
  }
}

