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
      test: '123',
      endpointData: [],
      activeSubmodule: false,
    }

    this.fetchModules()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.activeSubmodule != this.props.activeSubmodule) {
      // this.setState({adminList:[]})
      // this.setState({adminList:this.state.adminList})
      this.setState({activeSubmodule: nextProps.activeSubmodule})
      // this.fillList(this.state.endpointData)
      this.forceUpdate()
    }
  }

  fetchModules = () => {
    this.props.fetchWP.get('modules').then((json) => {

      this.setState({adminList: json.modules})
      this.props.setModules(json.modules)
    })
  }

  getActiveSubmodule = () => {
    return this.props.activeSubmodule
  }

  getActiveModule = () => {
    return this.props.activeModule
  }

  fillList = (modules) => {
    return modules.map(function (data, key) {

      let tmp_array = []
      tmp_array.push(<ListGroupItem active={this.getActiveModule() == key} header={data.post_title}></ListGroupItem>)

      data.fields.module_title_0 !== undefined && data.fields.module_title_0 !== '' ? tmp_array.push(
        <ListGroupItem
          active={this.getActiveSubmodule() == key + '_0'}>1. {data.fields.module_title_0}</ListGroupItem>) : null

      data.fields.module_title_1 !== undefined && data.fields.module_title_1 !== '' ? tmp_array.push(
        <ListGroupItem
          active={this.getActiveSubmodule() == key + '_1'}>2. {data.fields.module_title_1}</ListGroupItem>) : null

      data.fields.module_title_2 !== undefined &&  data.fields.module_title_2 !== '' ? tmp_array.push(
        <ListGroupItem
          active={this.getActiveSubmodule() == key + '_2'}>3. {data.fields.module_title_2}</ListGroupItem>) : null

      data.fields.module_title_3 !== undefined && data.fields.module_title_3 !== ''  ? tmp_array.push(
        <ListGroupItem
          active={this.getActiveSubmodule() == key + '_3'}>4. {data.fields.module_title_3}</ListGroupItem>) : null

      data.fields.module_title_4 !== undefined && data.fields.module_title_4 !== '' ? tmp_array.push(
        <ListGroupItem
          active={this.props.activeSubmodule == key + '_4'}>5. {data.fields.module_title_4}</ListGroupItem>) : null

      data.fields.module_title_5 !== undefined && data.fields.module_title_5 !== '' ? tmp_array.push(
        <ListGroupItem
          active={this.props.activeSubmodule == key + '_5'}>6. {data.fields.module_title_5}</ListGroupItem>) : null

      return tmp_array
    }.bind(this))
  }

  render () {
    return (
      <div className="sitebar-admin-wraper">
        <ListGroup className="sitebar-admin-course-list">
          <ListGroupItem header="Test wstępny" active={this.props.currentTest == 'pre-test'}></ListGroupItem>
          {this.fillList(this.state.adminList)}
          <ListGroupItem header="Test końcowy" active={this.props.currentTest == 'post-test'}></ListGroupItem>
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
  activeModule: state.appState.activeModule,
  activeSubmodule: state.appState.activeSubmodule,
})

export default connect(mapStateToProps, mapDispatchToProps)(SiteBarAdmin)
