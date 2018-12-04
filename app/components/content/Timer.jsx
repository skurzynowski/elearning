import React, { Component } from 'react'
import { connect } from 'react-redux'
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
  Radio
} from 'react-bootstrap'
import {
  setTimeout
} from '../../../redux/appState/actions'

class Timer extends React.Component {
  constructor (props) {
    super(props)
    let seconds = this.props.currentTest === 'pre-test' ? this.props.testsTime.pretestTime : this.props.testsTime.posttestTime
    seconds = seconds * 60
    this.props.setTimeOut(seconds)
    this.state = {counter: 1, currentQuestionNumber: 1, time: {}, seconds: seconds}
    this.timer = 0
    this.startTimer = this.startTimer.bind(this)
    this.countDown = this.countDown.bind(this)
  }

  secondsToTime = secs => {
    let divisor_for_minutes = secs % (60 * 60)
    let minutes = Math.floor(divisor_for_minutes / 60)

    let divisor_for_seconds = divisor_for_minutes % 60
    let seconds = Math.ceil(divisor_for_seconds)

    let obj = {
      m: minutes,
      s: seconds
    }
    return obj
  }

  componentDidMount = () => {
    let timeLeftVar = this.secondsToTime(this.state.seconds)
    this.setState({time: timeLeftVar})
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

  startTimer = () => {
    if (
      this.props.questionsCollection.length > 0 &&
      this.timer == 0 &&
      this.state.seconds > 0
    ) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  countDown = () => {
    let seconds = this.state.seconds - 1
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    })

    if (this.props.selectedAnswers.length === this.props.questionsCollection.length || seconds == 0) {
      clearInterval(this.timer)
      this.disableCheckboxes()
    }
  }

  addLeadingZeros = value => {
    value = String(value)
    while (value.length < 2) {
      value = '0' + value
    }
    return value
  }

  disableCheckboxes = () => {
    this.props.setTimeOut(0)
    // let checkboxes = document.querySelectorAll(".radio-inline input");
    // checkboxes.forEach(checkbox => {
    //   checkbox.disabled = true;
    // });
  }
  componentWillReceiveProps = (newProps) => {
    console.log('timer', newProps)
  }

  showQuestionNumber = () => {
    let currentQuestion = this.props.selectedAnswers.length < 1 ? 1 : this.props.selectedAnswers.length + 1
    currentQuestion = (currentQuestion >= this.props.questionsCollection.length) ? this.props.questionsCollection.length : currentQuestion
    return <span>Pytanie {currentQuestion} z {this.props.questionsCollection.length}</span>
  }

  clock = () => {
    return (
      <React.Fragment>
        <span>
          {this.addLeadingZeros(this.state.time.m)}:{this.addLeadingZeros(
          this.state.time.s
        )}
        </span>
        {this.startTimer()}
      </React.Fragment>
    )
  }

  render () {
    const panelStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '10px 0',
      fontSize: '24px'
    }
    return (
      <Col key={this.props.questionsCollection[0].ID}>
        <div style={panelStyle}>
          {this.showQuestionNumber()}
          {this.clock()}
        </div>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setTimeOut: timeout => dispatch(setTimeout(timeout)),
})

const mapStateToProps = state => ({
  questionsCollection: state.appState.questionsCollection,
  testResults: state.appState.testResults,
  selectedAnswers: state.appState.selectedAnswers,
  currentTest: state.appState.currentTest,
  testsTime: state.appState.testsTime,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
