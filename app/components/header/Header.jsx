import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import CourseTitle from './CourseTitle'
import ProgressBar from './ProgressBar'
import UserPanel from './UserPanel'

export default class Header extends Component {
  render () {
    return (
      <Grid fluid>
        <Row>
          <Col className="col-sm-offset-6 col-sm-6">
            <ProgressBar/>
          </Col>
        </Row>
        {this.props.passedExam ? (
          <Row>
            <Col className="col-md-12 col-xs-12">
              {this.props.alert()}
            </Col>
          </Row>
        ) : (null)}
      </Grid>
    )
  }
}
