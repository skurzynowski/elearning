import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import CourseTitle from './CourseTitle'
import ProgressBar from './ProgressBar'
import Logo from './Logo'
import UserPanel from './UserPanel'

export default class Header extends Component {
  render () {
    return (
      <Container fluid>
        <Row className="d-flex header-wraper">
          <Logo/>
          <CourseTitle/>
          <ProgressBar/>
          <UserPanel/>
        </Row>
      </Container>
    )
  }
}

