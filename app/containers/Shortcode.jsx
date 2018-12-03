import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Panel, Alert } from 'react-bootstrap'
import Header from '../components/header/Header'
import { connect } from 'react-redux'
import {
  setCurrentTest,
  toggleUserLogginStatus,
  setFetchWP,
  updateListOfTests,
  setAppMode,
  setSumOfQuestions,
  setTestsTime,
  setUserPassExam,
} from '../../redux/appState/actions'
import SiteBarAdmin from '../components/sitebar/SiteBarAdmin'
import AddNewCourse from '../components/content/AddNewCourse'
import AddNewQuestion from '../components/content/AddNewQuestion'
import fetchWP from '../utils/fetchWP'
import AdminControlBar from '../components/content/AdminControlBar'
import WelcomeUser from '../components/content/WelcomeUser'
import QuestionUser from '../components/content/QuestionUser'
import TestResult from '../components/content/TestResult'
import Post from '../components/content/Post'
import Certificate from '../components/content/Certificate'
import Timer from '../components/content/Timer'
import InfoModal from '../components/sitebar/InfoModal'
import DownloadCertificateButton from '../components/content/DownloadCertificateButton'

class Shortcode extends Component {
  constructor (props) {
    super(props)

    let fetchWPInstance = new fetchWP({
      restURL: this.props.wpObject.api_url,
      restNonce: this.props.wpObject.api_nonce
    })

    this.props.setFetchWP(fetchWPInstance)
    this.props.setUserPassExam(this.props.wpObject.examResult)
  }

  componentDidMount () {
    this.props.setSumOfQuestions(this.props.wpObject.sumOfQuestions)
    this.props.setTestsTime(this.props.wpObject.testsTime)
  }

  getAlertDownoladCertificate = () => {
    if (true) {
      return (<Header passedExam alert={this.getAlert}/>)
    }
  }

  getAlert = () => {
    if (this.props.userPassedExam.passed === 'true') {
      const alertClass = 'success'
      const text = 'Egzamin zdany. Gratulacje!'
      const button = <DownloadCertificateButton/>
      return (
        <Alert id={'certificateDownloadAlert'} bsStyle={alertClass}>
          {text}{button}
        </Alert>
      )
    } else {
      return ''
    }
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col className="col-md-3 col-xs-12">
            <SiteBarAdmin/>
          </Col>
          <Col className="col-md-9 col-xs-12">
            <Row>
              <Col>
                {this.props.appGlobalMode === 'certificate' ? (<Certificate/>) : (
                  this.getAlertDownoladCertificate()
                )}
                {this.props.appGlobalMode === 'welcome' ? <WelcomeUser/> : null}
                {(this.props.appGlobalMode === 'test' && this.props.questionsCollection.length > 0) ? (
                  <Timer/>
                ) : null}
                {this.props.appGlobalMode === 'test' &&
                this.props.questionsCollection.length > 0 ? (
                  <QuestionUser/>
                ) : null}
                {this.props.notAllowed.status === true ? <InfoModal/> : null}
                {this.props.appGlobalMode === 'result' ? <TestResult/> : null}
                {this.props.appGlobalMode === 'post' ? <Post/> : null}
                {this.props.appGlobalMode === 'add_question' ? (
                  <AddNewQuestion/>
                ) : null}
                {this.props.appGlobalMode === 'add_course' ? (
                  <AddNewCourse/>
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Shortcode.propTypes = {
  wpObject: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
  toggleUserLogginStatus: status => dispatch(toggleUserLogginStatus(status)),
  setFetchWP: fetchWP => dispatch(setFetchWP(fetchWP)),
  updateListOfTests: list => dispatch(updateListOfTests(list)),
  setAppMode: mode => dispatch(setAppMode(mode)),
  setCurrentTest: testSlug => dispatch(setCurrentTest(testSlug)),
  setSumOfQuestions: sum => dispatch(setSumOfQuestions(sum)),
  setTestsTime: testsTime => dispatch(setTestsTime(testsTime)),
  setUserPassExam: result => dispatch(setUserPassExam(result))
})

const mapStateToProps = state => ({
  appGlobalMode: state.appState.appGlobalMode,
  questionsCollection: state.appState.questionsCollection,
  notAllowed: state.appState.notAllowed,
  certificate: state.appState.certificate,
  userPassedExam: state.appState.passedTest,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shortcode)
