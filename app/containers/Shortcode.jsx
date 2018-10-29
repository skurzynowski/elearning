import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import Header from '../components/header/Header'
import { connect } from 'react-redux'
import { toggleUserLogginStatus, setFetchWP, updateListOfTests } from '../../redux/appState/actions'
import SiteBarAdmin from '../components/sitebar/SiteBarAdmin'
import AddNewCourse from '../components/content/AddNewCourse'
import AddNewQuestion from '../components/content/AddNewQuestion'
import fetchWP from '../utils/fetchWP'
import AdminControlBar from '../components/content/AdminControlBar'
import WelcomeUser from '../components/content/WelcomeUser'
import QuestionUser from '../components/content/QuestionUser'
import TestResult from '../components/content/TestResult'

class Shortcode extends Component {

  constructor (props) {
    super(props)

    let fetchWPInstance = new fetchWP({
      restURL: this.props.wpObject.api_url,
      restNonce: this.props.wpObject.api_nonce,
    })

    if (this.props.wpObject.listOfTests !== null && this.props.wpObject.listOfTests.length > 0) {
      this.props.updateListOfTests(this.props.wpObject.listOfTests)
    }
    this.props.setFetchWP(fetchWPInstance)
  };

  render () {
    return (
      <Container fluid>
        <Row>
          <Col xs="2">
            <SiteBarAdmin/>
          </Col>
          <Col xs="10">
            <Header/>
            <AdminControlBar/>
            {this.props.appGlobalMode === 'welcome' ? <WelcomeUser/> : null}
            {this.props.appGlobalMode === 'test' && this.props.questionsCollection.length > 0 ? <QuestionUser/> : null}
            {this.props.appGlobalMode === 'result' ? <TestResult/> : null}
            {this.props.appGlobalMode === 'add_question' ? <AddNewQuestion/> : null}
            {this.props.appGlobalMode === 'add_course' ? <AddNewCourse/> : null}
          </Col>
        </Row>
      </Container>
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
})

const mapStateToProps = state => ({
  isUserLoggedIn: state.appState.isUserLoggedIn,
  appGlobalMode: state.appState.appGlobalMode,
  questionsCollection: state.appState.questionsCollection,
})

export default connect(mapStateToProps, mapDispatchToProps)(Shortcode)