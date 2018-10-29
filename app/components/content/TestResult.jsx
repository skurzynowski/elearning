import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CustomInput,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap'
import fetchWp from '../../utils/fetchWP'
import { connect } from 'react-redux'
import {
  updateAnswers,
  updateQuestionsCollection,
  updateListOfTests,
} from '../../../redux/appState/actions'

const imagePlaceholder = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'

class TestResult extends Component {

  render () {
    return (
      <Col xs={{size: 8, offset: 2}}>
        <Container className="content-test-result" fluid>
          <Card>
            <CardBody>
              <h3>Gratulacje! Zakończyłeś test.</h3>
              <p>Twój wynik to: 50%</p>
            </CardBody>
          </Card>
        </Container>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateListOfTests: (list) => dispatch(updateListOfTests(list)),
  updateQuestionsCollection: (list) => dispatch(updateQuestionsCollection(list)),
  updateAnswers: (answers) => dispatch(updateAnswers(answers)),
})

const mapStateToProps = state => ({
  questionsCollection: state.appState.questionsCollection,
  fetchWP: state.appState.fetchWP,
  selectedAnswers: state.appState.selectedAnswers,
})

export default connect(mapStateToProps, mapDispatchToProps)(TestResult)
