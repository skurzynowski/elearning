import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  Button,
  Panel,
} from 'react-bootstrap'
import fetchWp from '../../utils/fetchWP'
import { connect } from 'react-redux'
import {
  updateQuestionsCollection,
  updateListOfTests,
  setAppMode,
  updateAnswers,
  setSelectedAnswersDefault,
  resetVisitedModules,
  setActiveSubmodule,
  setActiveModule,
} from '../../../redux/appState/actions'

class RepeatCourseButton extends Component {
  onClick = () => {
    this.props.setAppMode('post')
    this.props.resetVisitedModules()
    this.props.setActiveModule(0)
    this.props.setActiveSubmodule('0_0')
    this.props.setAnswersDefault()
  }

  render () {
    return (
      <Button onClick={this.onClick} className="btn-primary">
        Powtórz kurs
      </Button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateQuestionsCollection: list => dispatch(updateQuestionsCollection(list)),
  setAppMode: list => dispatch(setAppMode(list)),
  setAnswersDefault: () => dispatch(setSelectedAnswersDefault()),
  resetVisitedModules: () => dispatch(resetVisitedModules()),
  setActiveModule: (module) => dispatch(setActiveModule(module)),
  setActiveSubmodule: (submodule) => dispatch(setActiveSubmodule(submodule)),
})

const mapStateToProps = state => ({
  fetchWP: state.appState.fetchWP,
  currentTest: state.appState.currentTest,
  globalAppMode: state.appState.globalAppMode,
  currentTest: state.appState.currentTest,
  selectedAnswers: state.appState.selectedAnswers,
  questionsCollection: state.appState.questionsCollection,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepeatCourseButton)
