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
  setModuleKeys, setNotAllowed, setSelectedAnswersDefault, updateQuestionsCollection, setCurrentTest, setTestCounter
} from '../../../redux/appState/actions'

class SideBarElement extends Component {
  constructor (props) {
    super(props)

    this.state = {
      checked: false,
    }
  }

  setNotAllowed = (message) => {
    let notAllowed = {}
    notAllowed.status = true
    notAllowed.info = {}
    notAllowed.info.btn = 'Zamknij'
    notAllowed.info.body = message

    this.props.setNotAllowed(notAllowed)
  }

  isClickValid = () => {
    if (this.props.appGlobalMode === 'welcome') {
      return false
    }
    if (this.props.appGlobalMode === 'test') {
      return false
    }
    if (this.props.appGlobalMode === 'post') {
      return true
    }
    if (this.props.appGlobalMode === 'result' && this.props.currentTest === 'post-test') {
      return false
    }
    if (this.props.appGlobalMode === 'result' && this.props.currentTest === 'pre-test') {
      this.props.setAppMode('post')
      return true
    }
  }

  startPreTest = () => {
    if (this.props.appGlobalMode === 'welcome') {
      this.props.setAnswersDefault()
      this.props.fetchWP
        .get('question/' + this.props.currentTest)
        .then(json => this.props.updateQuestionsCollection(json.question))
        .then(this.props.setAppMode('test'))
    }
  }

  startExamTest = () => {
    if (this.props.appGlobalMode === 'result' && this.props.currentTest === 'post-test') {
      this.setNotAllowed('Zakończyłeś już przeglądanie modułów szkoleniowych')
      return
    }

    // not all module finished
    if (this.props.visitedModules.length !== this.props.moduleKeys.length) {
      this.setNotAllowed('Ukończ wszystkie moduły, aby zacząć test końcowy')
      return
    }

    // test already started
    if (this.props.appGlobalMode === 'test') {
      return
    }

    this.props.setAnswersDefault()
    this.props.fetchWP
      .get('question/' + 'post-test')
      .then(json => this.props.updateQuestionsCollection(json.question))
      .then(this.props.setAppMode('test'))
      .then(this.props.setCurrentTest('post-test'))
      .then(this.props.setActiveSubmodule(null))
      .then(this.props.setActiveModule(null))
  }

  handleClick = () => {
    const {type} = this.props
    const submodule = typeof this.props.submoduleKey === 'undefined' ? '0' : this.props.submoduleKey
    const module = this.props.moduleKey
    switch (type) {
      case 'pretest':
        this.startPreTest()
        break
      case 'posttest':
        if (this.props.appGlobalMode !== 'result') {
          this.props.setTestCounter();
        }
        this.startExamTest()
        break
      case 'submodule':
      case 'module':
        if (this.isClickValid()) {
          this.props.setActiveSubmodule(module + '_' + submodule)
          this.props.setActiveModule(module)
          return
        } else {
          if (this.props.currentTest === 'pre-test') {
            this.setNotAllowed('Ukończ test wstępny aby przejść do modułu lekcyjnego')
          } else {
            this.setNotAllowed('Moduły szkoleniowe są zablokowane')
          }
        }
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
  setNotAllowed: bool => dispatch(setNotAllowed(bool)),
  setAnswersDefault: () => dispatch(setSelectedAnswersDefault()),
  updateQuestionsCollection: list => dispatch(updateQuestionsCollection(list)),
  setCurrentTest: test => dispatch(setCurrentTest(test)),
  setTestCounter: () => dispatch(setTestCounter())
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
