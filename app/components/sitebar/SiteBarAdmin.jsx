import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import Logo from './Logo'

class SiteBarAdmin extends Component {
  renderListOfCourse = () => {
    return this.props.listOfCourses.map(function (data, key) {
      return <li key={'course_' + key}>{key+1} {data.title}</li>
    })
  }

  render () {
    return (
      <div className="sitebar-admin-wraper">
        <Logo/>
        <ul className="sitebar-admin-course-list">
          {this.renderListOfCourse()}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = ({})

const mapStateToProps = state => ({
  courseTitle: state.appState.courseTitle,
  listOfCourses: state.appState.listOfCourses,
})

export default connect(mapStateToProps, mapDispatchToProps)(SiteBarAdmin)
