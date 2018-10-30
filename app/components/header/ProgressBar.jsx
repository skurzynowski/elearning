import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ProgressBar } from 'react-bootstrap'

class ProgressBarTest extends Component {
  countProgres = () => {
    if (!isNaN(this.props.questionsCollection.length) && this.props.questionsCollection.length > 0 && !isNaN(this.props.selectedAnswers.length) && this.props.selectedAnswers.length > 0) {
      return Math.floor((this.props.selectedAnswers.length / this.props.questionsCollection.length) * 100)
    } else {
      return 0
    }
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

const mapDispatchToProps = ({})

const mapStateToProps = state => ({
  questionsCollection: state.appState.questionsCollection,
  selectedAnswers: state.appState.selectedAnswers,
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarTest)
