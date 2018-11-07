import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import Header from '../components/header/Header'
import { connect } from 'react-redux'
import {
  setCurrentTest,
  toggleUserLogginStatus,
  setFetchWP,
  updateListOfTests,
  setAppMode
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

class Shortcode extends Component {
  constructor (props) {
    super(props)

    let fetchWPInstance = new fetchWP({
      restURL: this.props.wpObject.api_url,
      restNonce: this.props.wpObject.api_nonce
    })

    this.props.setFetchWP(fetchWPInstance)
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col className="col-md-3 col-xs-12">
            {this.props.appGlobalMode === 'certificate' ? null : (
              <SiteBarAdmin/>
            )}
          </Col>
          <Col className="col-md-9 col-xs-12">
            <Row>
              <Col>
                {this.props.appGlobalMode === 'certificate' ? <Certificate/> : (
                  <Header/>
                )}
                {}
                {this.props.appGlobalMode === 'welcome' ? <WelcomeUser/> : null}
                {(this.props.appGlobalMode === 'test' &&
                  this.props.questionsCollection.length > 0) ||
                this.props.appGlobalMode === 'result' ? (
                  <Timer/>
                ) : null}
                {this.props.appGlobalMode === 'test' &&
                this.props.questionsCollection.length > 0 ? (
                  <QuestionUser/>
                ) : null}
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
  setCurrentTest: testSlug => dispatch(setCurrentTest(testSlug))
})

const mapStateToProps = state => ({
  appGlobalMode: state.appState.appGlobalMode,
  questionsCollection: state.appState.questionsCollection
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shortcode)
