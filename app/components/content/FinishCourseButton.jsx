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
  Panel
} from 'react-bootstrap'
import fetchWp from '../../utils/fetchWP'
import { connect } from 'react-redux'
import {
  updateQuestionsCollection,
  updateListOfTests,
  setAppMode,
  updateAnswers,
  setSelectedAnswersDefault
} from '../../../redux/appState/actions'

class FinishCourseButton extends Component {
  getQuestions = () => {
    this.props.setAnswersDefault()
    this.props.fetchWP
      .get('question/' + this.props.currentTest)
      .then(json => this.props.updateQuestionsCollection(json.question))
      .then(this.props.setAppMode('test'))
  }
  componentWillReceiveProps = (newProps) => {
  }

  render () {
    return (
      <Button href={'https://medycyna-ratunkowa.pl/'} className="btn-primary">
        Zakończ kurs
      </Button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateQuestionsCollection: list => dispatch(updateQuestionsCollection(list)),
  setAppMode: list => dispatch(setAppMode(list)),
  setAnswersDefault: () => dispatch(setSelectedAnswersDefault())
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
)(FinishCourseButton)
