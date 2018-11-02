import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setActivePost, setModules } from '../../../redux/appState/actions'

class SiteBarAdmin extends Component {

  constructor (props) {
    super(props)

    this.state = {
      adminList: [],
    }

    this.fetchModules()
  }

  fetchModules = () => {
    this.props.fetchWP.get('modules').then((json) => this.fillList(json.modules))
  }

  fillList = (modules) => {
    this.props.setModules(modules);
    let array = modules.map(function (data) {

      let tmp_array = []

      tmp_array.push(<ListGroupItem header={data.post_title}></ListGroupItem>)

      data.fields.module_title_0 !== undefined ? tmp_array.push(
        <ListGroupItem>1. {data.fields.module_title_0}</ListGroupItem>) : null

      data.fields.module_title_1 !== undefined ? tmp_array.push(
        <ListGroupItem>2. {data.fields.module_title_1}</ListGroupItem>) : null

      data.fields.module_title_2 !== undefined ? tmp_array.push(
        <ListGroupItem>3. {data.fields.module_title_2}</ListGroupItem>) : null

      data.fields.module_title_3 !== undefined ? tmp_array.push(
        <ListGroupItem>4. {data.fields.module_title_3}</ListGroupItem>) : null

      data.fields.module_title_4 !== undefined ? tmp_array.push(
        <ListGroupItem>5. {data.fields.module_title_4}</ListGroupItem>) : null

      data.fields.module_title_5 !== undefined ? tmp_array.push(
        <ListGroupItem>6. {data.fields.module_title_5}</ListGroupItem>) : null

      return tmp_array
    })

    this.setState({adminList: this.state.adminList.concat(array)})
    console.log(this.state)
  }

  render () {
    return (
      <div className="sitebar-admin-wraper">
        <ListGroup className="sitebar-admin-course-list">
          <ListGroupItem header="Test wstępny" active></ListGroupItem>
          {this.state.adminList}
          <ListGroupItem header="Test końcowy"></ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

const mapDispatchToProps = ({
  activePost: (post) => setActivePost(post),
  setModules: (modules) => setModules(modules),
})

const mapStateToProps = state => ({
  listOfTests: state.appState.listOfTests,
  currentTest: state.appState.currentTest,
  fetchWP: state.appState.fetchWP,
})

export default connect(mapStateToProps, mapDispatchToProps)(SiteBarAdmin)
