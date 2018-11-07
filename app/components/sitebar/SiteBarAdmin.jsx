import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setActivePost, setActiveSubmodule,setActiveModule, setAppMode, setModules } from '../../../redux/appState/actions'

class SiteBarAdmin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      adminList: [],
      test: '123',
      endpointData: [],
      activeSubmodule: false
    }

    this.fetchModules()
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.activeSubmodule != this.props.activeSubmodule) {
      // this.setState({adminList:[]})
      // this.setState({adminList:this.state.adminList})
      this.setState({activeSubmodule: nextProps.activeSubmodule})
      // this.fillList(this.state.endpointData)
      this.forceUpdate()
    }
  }

  fetchModules = () => {
    this.props.fetchWP.get('modules').then(json => {
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
  onClickModule = (key) => {
    this.props.setActiveSubmodule(key)
    this.props.setActiveModule(key[0])
    this.props.setAppMode('post')
  }

  fillList = modules => {
    return modules.map(
      function (data, key) {
        let tmp_array = []
        tmp_array.push(
          <ListGroupItem
            active={this.getActiveModule() == key}
            key={key + '_module'}
            header={data.post_title}
          />
        )

        for (let i = 0; i < 6; i++) {
          let elementName = 'module_title_' + i
          let submodulNumber = key + '_' + i
          !!data.fields[elementName] && tmp_array.push(<ListGroupItem
            onClick={() => this.onClickModule(submodulNumber)}
            active={this.getActiveSubmodule() == submodulNumber} key={elementName}>
            1. {data.fields[elementName]}
          </ListGroupItem>)
        }
        return tmp_array
      }.bind(this)
    )
  }

  render () {
    return (
      <div className="sitebar-admin-wraper">
        <ListGroup className="sitebar-admin-course-list">
          <ListGroupItem
            header="Test wstępny"
            active={this.props.currentTest == 'pre-test'}
          />
          {this.fillList(this.state.adminList)}
          <ListGroupItem
            header="Test końcowy"
            active={this.props.currentTest == 'post-test'}
          />
        </ListGroup>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  activePost: post => dispatch(setActivePost(post)),
  setModules: modules => dispatch(setModules(modules)),
  setActiveSubmodule: submodule => dispatch(setActiveSubmodule(submodule)),
  setActiveModule: module => dispatch(setActiveModule(module)),
  setAppMode: mode => dispatch(setAppMode(mode)),
})

const mapStateToProps = state => ({
  listOfTests: state.appState.listOfTests,
  currentTest: state.appState.currentTest,
  fetchWP: state.appState.fetchWP,
  activeModule: state.appState.activeModule,
  activeSubmodule: state.appState.activeSubmodule,

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteBarAdmin)
