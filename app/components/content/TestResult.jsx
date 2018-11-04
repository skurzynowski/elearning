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
  ProgressBar
} from 'react-bootstrap'
import fetchWp from '../../utils/fetchWP'
import { connect } from 'react-redux'
import {
  updateAnswers,
  updateQuestionsCollection,
  setCurrentTest,
  updateListOfTests, setSelectedAnswersDefault,
} from '../../../redux/appState/actions'
import StartTestButton from '../content/StartTestButton'
import StartModuleButton from '../content/StartModuleButton'
import DownloadCertificateButton from '../content/DownloadCertificateButton'

const imagePlaceholder = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'

class TestResult extends Component {

  constructor (props) {
    super(props)
    this.state = {
      lastTest: false,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps == this.props) {
      return
    }
    this.props.setAnswersDefault()
    let currentTestSlug = this.props.currentTest
    let currentTest = this.props.listOfTests.filter(function (data) {return data.slug === currentTestSlug}.bind(currentTestSlug))
    let indexOfCurrentTest = this.props.listOfTests.indexOf(...currentTest)
    if (indexOfCurrentTest + 1 < this.props.listOfTests.length) {
      let nextTest = this.props.listOfTests[indexOfCurrentTest + 1]
      this.props.setCurrentTest(nextTest.slug)
    } else {
      this.setState({lastTest: true})
    }
  }
  getCertificateButton = () => {
    if( this.props.currentTest == 'post-test' && this.props.testResults.percents >= 75 ){
      return <DownloadCertificateButton/>
    }
  }

  render () {
    return (
      <Col xs={8} offset={2}>
        <Grid componentClass="content-test-result" fluid>
          <Panel>
            <Panel.Body>
              <h3>Gratulacje! Zakończyłeś
                test{this.props.currentTest == 'pre-test' ? ' wstępny' : ' podsumowujący'}.</h3>
              <div className="text-left">Wynik testu:{this.props.testResults.percents}%</div>
              <ProgressBar now={this.props.testResults.percents}/>
              <p>Poprawne odpowiedzi: {this.props.testResults.correct}</p>
              <p>Błędne odpowiedzi: {this.props.testResults.wrong}</p>
              {this.props.currentTest == 'pre-test' ? <StartModuleButton/> : null}
              {this.state.lastTest ? this.getCertificateButton() : <StartTestButton/>}
            </Panel.Body>
          </Panel>
        </Grid>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateListOfTests: (list) => dispatch(updateListOfTests(list)),
  updateQuestionsCollection: (list) => dispatch(updateQuestionsCollection(list)),
  setAnswersDefault: () => dispatch(setSelectedAnswersDefault()),
  setCurrentTest: (testSlug) => dispatch(setCurrentTest(testSlug)),
})

const mapStateToProps = state => ({
  testResults: state.appState.testResults,
  currentTest: state.appState.currentTest,
  listOfTests: state.appState.listOfTests,
})

export default connect(mapStateToProps, mapDispatchToProps)(TestResult)
