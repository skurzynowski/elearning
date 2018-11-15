import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ProgressBar } from 'react-bootstrap'

class ProgressBarTest extends Component {
  constructor (props) {
    super(props)
  }

  countProgres = () => {
    const {currentTest, visitedModules, moduleKeys, appGlobalMode, selectedAnswers, questionsCollection} = this.props
    switch (appGlobalMode) {
      case 'test':
        if (questionsCollection.length > 0) {
          return (parseInt((selectedAnswers.length / questionsCollection.length) * 100))
        }
        return 0
      case 'post':
        if (visitedModules.length > 0) {
          return (parseInt((visitedModules.length / moduleKeys.length) * 100))
        }
        return 0
      case 'welcome':
        return 0
      case 'result':
        return 100
    }
  }

  getTitle = () => {
    const {currentTest, visitedModules, moduleKeys, appGlobalMode, selectedAnswers, questionsCollection} = this.props
    switch (appGlobalMode) {
      case 'test':
        if (currentTest === 'pre-test') {
          return 'Ukończenie pretestu'
        } else {
          return 'Ukończenie egzaminu'
        }
      case 'post':
        return 'Ukończenie kursu'
      case 'welcome':
        return 'Ukończenie pretestu'
      case 'result':
        if (currentTest === 'pre-test') {
          return 'Ukończenie pretestu'
        } else {
          return 'Ukończenie egzaminu'
        }
    }
  }

  render () {
    return (
      <div className="header-progress-bar">
        <div className="text-left">{this.getTitle()} {this.countProgres()}%</div>
        <ProgressBar now={this.countProgres()}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questionsCollection: state.appState.questionsCollection,
  selectedAnswers: state.appState.selectedAnswers,
  sumQuestions: state.appState.sumQuestions,
  progress: state.appState.progress,
  moduleKeys: state.appState.moduleKeys,
  appGlobalMode: state.appState.appGlobalMode,
  visitedModules: state.appState.visitedModules,
  moduleKeys: state.appState.moduleKeys,
  currentTest: state.appState.currentTest,
})

export default connect(mapStateToProps)(ProgressBarTest)
