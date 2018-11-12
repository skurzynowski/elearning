import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ProgressBar } from 'react-bootstrap'

class ProgressBarTest extends Component {
  countProgres = () => {
    let allQuestions = this.props.sumQuestions
    let allModules = this.props.moduleKeys.length
    let progress = this.props.progress && parseInt(((this.props.progress / (parseInt(allModules) + parseInt(allQuestions))) * 100))
    if (progress > 100) {
      return 100
    }
    return progress
  }

  render () {
    return (
      <div className="header-progress-bar">
        <div className="text-left">Ukończenie kursu {this.countProgres()}%</div>
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
})

export default connect(mapStateToProps)(ProgressBarTest)
