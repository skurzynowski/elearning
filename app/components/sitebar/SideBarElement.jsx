import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import CheckedIcon from './CheckedIcon'
import {
  setActivePost,
  setActiveSubmodule,
  setActiveModule,
  setAppMode,
  setModules,
  setModuleKeys,
} from '../../../redux/appState/actions'

class SideBarElement extends Component {
  constructor (props) {
    super(props)

    this.state = {
      checked: false,
    }
  }

  handleClick = () => {
    const {type} = this.props
    const submodule = typeof this.props.submoduleKey === 'undefined' ? '0' : this.props.submoduleKey
    const module = this.props.moduleKey
    switch (type) {
      case 'pretest':
      case 'posttest':
        return
      case 'submodule':
      case 'module':
        this.props.setActiveSubmodule(module + '_' + submodule)
        this.props.setActiveModule(module)
    }
  }

  isChecked = () => {
    const {type} = this.props
    const submodule = typeof this.props.submoduleKey === 'undefined' ? '0' : this.props.submoduleKey
    const module = this.props.moduleKey
    switch (type) {
      case 'pretest':
      case 'posttest':
        return null
      case 'submodule':
        return (this.props.visitedModules.indexOf(module + '_' + submodule) >= 0 ? <CheckedIcon/> : null)
    }
  }

  render () {
    const {text, active, header, icon} = this.props

    return (
      <ListGroupItem
        header={header}
        active={this.isActive()}
        onClick={this.handleClick}
      >
        {this.isChecked()}{text}
      </ListGroupItem>
    )
  }

  isActive = () => {
    const {type} = this.props
    switch (type) {
      case 'pretest':
        const isPreTest = this.props.appGlobalMode === 'test' && this.props.currentTest == 'pre-test'
        const isWelcome = this.props.appGlobalMode === 'welcome'
        return isPreTest || isWelcome

      case 'module':
        return this.props.activeModule === this.props.moduleKey

      case 'submodule':
        console.log(this.props.activeSubmodule, this.props.submoduleKey)
        return this.props.activeSubmodule === (this.props.moduleKey + '_' + this.props.submoduleKey)

      case 'posttest':
        return this.props.appGlobalMode === 'test' && this.props.currentTest == 'post-test'
    }
  }
}

const mapDispatchToProps = dispatch => ({
  activePost: post => dispatch(setActivePost(post)),
  setModules: modules => dispatch(setModules(modules)),
  setActiveSubmodule: submodule => dispatch(setActiveSubmodule(submodule)),
  setActiveModule: module => dispatch(setActiveModule(module)),
  setAppMode: mode => dispatch(setAppMode(mode)),
  setModuleKeys: keys => dispatch(setModuleKeys(keys)),
})

const mapStateToProps = state => ({
  listOfTests: state.appState.listOfTests,
  currentTest: state.appState.currentTest,
  fetchWP: state.appState.fetchWP,
  activeModule: state.appState.activeModule,
  activeSubmodule: state.appState.activeSubmodule,
  appGlobalMode: state.appState.appGlobalMode,
  moduleKeys: state.appState.moduleKeys,
  visitedModules: state.appState.visitedModules,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarElement)
