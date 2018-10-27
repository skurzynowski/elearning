import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'

class CourseTitle extends Component {
  render () {
    return (
      <div className="header-course-title">
        <h2>{this.props.courseTitle}</h2>
      </div>
    )
  }
}

const mapDispatchToProps = ({})

const mapStateToProps = state => ({
  courseTitle: state.appState.courseTitle
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseTitle)
