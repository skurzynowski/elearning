import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import {
  updateQuestionsCollection,
  setAppMode,
  setSelectedAnswersDefault,
  setTestCounter
} from '../../../redux/appState/actions'

class RepeatExamButton extends Component {
  onClick = () => {
    this.props.setTestCounter();
    this.props.setAppMode('test')
    this.props.setAnswersDefault()
    this.props.updateQuestionsCollection(list)
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  render () {
    return (
      <Button onClick={this.onClick} className="btn-primary">
        Powtórz egzamin
      </Button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateQuestionsCollection: list => dispatch(updateQuestionsCollection(list)),
  setAppMode: list => dispatch(setAppMode(list)),
  setAnswersDefault: () => dispatch(setSelectedAnswersDefault()),
  setTestCounter: () => dispatch(setTestCounter())
})

export default connect(
  null,
  mapDispatchToProps
)(RepeatExamButton)
