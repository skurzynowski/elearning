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
import LogInForm from '../components/content/LogInForm'
import Post from '../components/content/Post'

class Shortcode extends Component {

  constructor (props) {
    super(props)

    let fetchWPInstance = new fetchWP({
      restURL: this.props.wpObject.api_url,
      restNonce: this.props.wpObject.api_nonce,
    })

    this.props.setFetchWP(fetchWPInstance)
  };

  render () {
    return (
      <Grid fluid>
        <Row>
          <Col xs={2} lg={2} md={10}>
            <SiteBarAdmin/>
          </Col>
          <Col xs={10} lg={10} md={10}>
            <Header/>
            {this.props.appGlobalMode === 'welcome' ? <WelcomeUser/> : null}
            {this.props.appGlobalMode === 'post' ? <Post/> : null}
            {this.props.appGlobalMode === 'test' && this.props.questionsCollection.length > 0 ? <QuestionUser/> : null}
            {this.props.appGlobalMode === 'result' ? <TestResult/> : null}
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
  toggleUserLogginStatus: (status) => dispatch(toggleUserLogginStatus(status)),
  setFetchWP: (fetchWP) => dispatch(setFetchWP(fetchWP)),
  updateListOfTests: (list) => dispatch(updateListOfTests(list)),
  setAppMode: (mode) => dispatch(setAppMode(mode)),
  setCurrentTest: (testSlug) => dispatch(setCurrentTest(testSlug)),
})

const mapStateToProps = state => ({
  appGlobalMode: state.appState.appGlobalMode,
  questionsCollection: state.appState.questionsCollection,
})

export default connect(mapStateToProps, mapDispatchToProps)(Shortcode)