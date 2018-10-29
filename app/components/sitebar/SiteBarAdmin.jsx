import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import Logo from './Logo'

class SiteBarAdmin extends Component {
  renderListOfCourse = () => {
    return this.props.listOfTests.map(function (data, key) {
      return <li key={'course_' + key}>{key+1} {data.title} ( {data.count} )</li>
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
  listOfTests: state.appState.listOfTests,
})

export default connect(mapStateToProps, mapDispatchToProps)(SiteBarAdmin)
