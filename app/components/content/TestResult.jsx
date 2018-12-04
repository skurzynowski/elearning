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
  ProgressBar,
  Alert,
  Badge
} from 'react-bootstrap'
import fetchWp from '../../utils/fetchWP'
import { connect } from 'react-redux'
import {
  updateAnswers,
  updateQuestionsCollection,
  setCurrentTest,
  updateListOfTests,
  setSelectedAnswersDefault,
  setCertificateDownloaded,
  setUserPassExam,
  setTestCounter
} from '../../../redux/appState/actions'
import StartTestButton from '../content/StartTestButton'
import StartModuleButton from '../content/StartModuleButton'
import DownloadCertificateButton from '../content/DownloadCertificateButton'
import RepeatCourseButton from './RepeatCourseButton'
import RepeatExamButton from './RepeatExamButton'

const imagePlaceholder =
  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'

class TestResult extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastTest: false
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps == this.props) {
      return
    }
    let currentTestSlug = this.props.currentTest
    let currentTest = this.props.listOfTests.filter(
      function (data) {
        return data.slug === currentTestSlug
      }.bind(currentTestSlug)
    )
    let indexOfCurrentTest = this.props.listOfTests.indexOf(...currentTest)
    if (indexOfCurrentTest + 1 < this.props.listOfTests.length) {
      let nextTest = this.props.listOfTests[indexOfCurrentTest + 1]
      this.props.setCurrentTest(nextTest.slug)
    } else {
      this.setState({lastTest: true})
    }
  }
  getCertificateButton = () => {
    const {certificateDownloaded, currentTest, testResults} = this.props

    if (
      certificateDownloaded === true ||
      (currentTest == 'post-test' &&
        testResults.percents >= 75)
    ) {

      let  result = {}
      result.result = testResults.percents
      result.passed = 'true'
      result.test = 'egzamin'

      this.props.setUserPassExam(result)
      this.props.setCertificateDownloaded(true)
      return <DownloadCertificateButton/>
    }
  }

  getComebackLaterInfo = () => {
    if(this.props.testCounter === 3){
      return (
        <p style={{color: "#a94442", float:"left"}}>Limit prób został wykorzystany. Spróbuj ponownie później.</p>
      )
    }
  }

  getFinishCourseButton = () => {
    if (this.props.currentTest == 'post-test') {
      return (
        <Button href={'https://medycyna-ratunkowa.pl/'} className="btn-primary">
          Zakończ kurs
        </Button>
      )
    }
  }

  getAllertPercents = () => {
    if (this.props.testResults.percents >= 75) {
      var alertClass = 'success'
      var text = 'Gratulacje uzyskałeś niezbędne 75%'
    } else {
      var alertClass = 'danger'
      var text = 'Aby uzyskać certyfikat powinieneś uzyskać 75%'
    }
    return (
      <Alert bsStyle={alertClass}>
        <strong>{this.props.testResults.percents}%</strong> {text}
      </Alert>
    )
  }
  getAllertCorrectAnswers = () => {
    if (this.props.testResults.percents >= 75) {
      var alertClass = 'success'
    } else {
      var alertClass = 'danger'
    }
    return (
      <Alert bsStyle={alertClass}>
        Poprawne odpowiedzi: <strong>{this.props.testResults.correct}</strong>
      </Alert>
    )
  }

  getAllertWrongAnswers = () => {
    if (this.props.testResults.percents >= 75) {
      var alertClass = 'success'
    } else {
      var alertClass = 'danger'
    }
    return (
      <Alert bsStyle={alertClass}>
        Błędne odpowiedzi: <strong>{this.props.testResults.wrong}</strong>
      </Alert>
    )
  }

  getRepeateCourseButton = () => {
    if (this.props.currentTest === 'post-test' && this.props.testResults.percents < 75 && this.props.testCounter < 3) {
      return (<RepeatCourseButton/>)
    }
  }

  getRepeateExamButton = () => {
    console.log(this.props.currentTest === 'post-test' && this.props.testResults.percents < 75)
    console.log('thit is test')
    if (this.props.currentTest === 'post-test' && this.props.testResults.percents < 75 && this.props.testCounter < 3) {
      return (<RepeatExamButton/>)
    }
  }

  render () {
    return (
      <Col>
        <Grid componentClass="content-test-result">
          <Panel>
            <Panel.Body>
              <h3>
                Zakończyłeś test{this.props.currentTest == 'pre-test'
                ? ' wstępny'
                : ' podsumowujący'}.
              </h3>
              {this.getAllertPercents()}
              <ProgressBar now={this.props.testResults.percents}/>
              {this.getAllertCorrectAnswers()}
              {this.getAllertWrongAnswers()}
              {this.props.currentTest == 'pre-test' ? (
                <StartModuleButton/>
              ) : null}
              {this.getComebackLaterInfo()}
              <div id={'btns-container'} style={{float: 'right'}}>
                {this.getRepeateCourseButton()}
                {this.getRepeateExamButton()}
                {this.getCertificateButton()}
                {this.getFinishCourseButton()}
              </div>
            </Panel.Body>
          </Panel>
        </Grid>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateListOfTests: list => dispatch(updateListOfTests(list)),
  updateQuestionsCollection: list => dispatch(updateQuestionsCollection(list)),
  setAnswersDefault: () => dispatch(setSelectedAnswersDefault()),
  setCurrentTest: testSlug => dispatch(setCurrentTest(testSlug)),
  setCertificateDownloaded: bool => dispatch(setCertificateDownloaded(bool)),
  setUserPassExam: result => dispatch(setUserPassExam(result))
})

const mapStateToProps = state => ({
  testResults: state.appState.testResults,
  currentTest: state.appState.currentTest,
  listOfTests: state.appState.listOfTests,
  certificateDownloaded: state.appState.certificateDownloaded,
  testCounter: state.appState.testCounter
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestResult)
