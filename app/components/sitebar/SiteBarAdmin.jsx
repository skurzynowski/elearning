import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'

class SiteBarAdmin extends Component {
  renderListOfCourse = () => {
    let bindObject = {}
    bindObject.currentTestSlug = this.props.currentTest
    return this.props.listOfTests.map(function (data, key) {
      let active = data.slug === bindObject.currentTestSlug ? true : false;
      return <ListGroupItem header={data.title} active={active} key={'course_' + key}>{data.description}</ListGroupItem>
    }.bind(bindObject))
  }

  render () {
    return (
      <div className="sitebar-admin-wraper">
        <ListGroup className="sitebar-admin-course-list">
          {this.renderListOfCourse()}
        </ListGroup>
      </div>
    )
  }
}

const mapDispatchToProps = ({})

const mapStateToProps = state => ({
  listOfTests: state.appState.listOfTests,
  currentTest: state.appState.currentTest
})

export default connect(mapStateToProps, mapDispatchToProps)(SiteBarAdmin)
