import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import {setActivePost} from '../../../redux/appState/actions'

class SiteBarAdmin extends Component {
  renderListOfCourse = () => {
    let bindObject = this
    bindObject.currentTestSlug = this.props.currentTest
    return this.props.listOfTests.map(function (data, key) {
      let active = data.slug === bindObject.currentTestSlug ? true : false

      if (typeof data.e_posts_count !== 'undefined' && data.e_posts_count > 0) {
        var sublist = data.posts.map(function (dataPost) {
          return <ListGroupItem onClick={() =>bindObject.props.activePost(dataPost.ID)}
                                active={active}>{dataPost.post_title}</ListGroupItem>
        }.bind(active))
      } else {
        var sublist = null
      }

      let listElement = (<ListGroupItem header={data.title} active={active}
                                        key={'course_' + key}>{(sublist === null) ? data.description : sublist}</ListGroupItem>)

      return listElement
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

const mapDispatchToProps = ({
  activePost: (post) => setActivePost(post)
})

const mapStateToProps = state => ({
  listOfTests: state.appState.listOfTests,
  currentTest: state.appState.currentTest
})

export default connect(mapStateToProps, mapDispatchToProps)(SiteBarAdmin)
