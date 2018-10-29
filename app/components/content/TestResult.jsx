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
  CardText,
  Progress
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
              <div className="text-left">Wynik testu:{this.props.testResults.percents}%</div>
              <Progress value={this.props.testResults.percents}/>
              <p>Poprawne odpowiedzi: {this.props.testResults.correct}</p>
              <p>Błędne odpowiedzi: {this.props.testResults.wrong}</p>
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
  testResults: state.appState.testResults,
})

export default connect(mapStateToProps, mapDispatchToProps)(TestResult)
