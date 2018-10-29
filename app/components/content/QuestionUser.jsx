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
import { updateQuestionsCollection, updateListOfTests } from '../../../redux/appState/actions'

const imagePlaceholder = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'

class QuestionUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questionIndex: 0,
      questionsCollection: this.props.questionsCollection,
      selectedAnswer: '',
    }
  };

  onChangeRadio = (e) => {
    this.setState({correctAnswer: e.target.value})
  }
  onClickNextQuestion = () => {
    this.setState({questionIndex: this.state.questionIndex + 1, selectedAnswer: ''})
  }
  renderCourseOptions = () => {
    return this.props.listOfTests.map(function (data) {
      return <option key={data.slug} value={data.slug}>{data.name}</option>
    })
  }

  onChangeRadio = (e) => {
    this.setState({selectedAnswer: e.target.value})
  }
  renderQuestions = () => {
    let questions = this.props.questionsCollection[this.state.questionIndex].answer

    return questions.map(function (data) {
      if (data.value !== '') {
        return (
          <FormGroup key={this.state.selectedIndex + data.key}>
            <div className="d-flex justify-content-start">
              <CustomInput onChange={this.onChangeRadio} value={data.key}
                           checked={this.state.selectedAnswer === data.key} type="radio"
                           id={data.key + '_id_' + this.state.questionIndex}
                           name="correctAnswer" inline/>
              <h6>{data.value}</h6>
            </div>
          </FormGroup>)
      }
    }.bind(this))
  }

  renderFinishTestButton = () => {

    if (this.props.questionsCollection.length - 1 === this.state.questionIndex ) {
      return (
        <FormGroup>
          <Button onClick={this.onClickFinishTest}>Zakończ test</Button>
        </FormGroup>
      )
    }
  }

  renderNexQuestionButton = () => {
    if (this.state.selectedAnswer !== '' && this.props.questionsCollection.length -2 >= this.state.questionIndex) {
      return (<FormGroup>
          <Button onClick={this.onClickNextQuestion}>Następne pytanie</Button>
        </FormGroup>
      )
    }
  }

  render () {
    return (
      <Col xs={{size: 8, offset: 2}}>
        <Container className="content-add-new-course" fluid>
          <Card>
            <CardImg top width="100%" src={this.props.questionsCollection[this.state.questionIndex].imageSrc}
                     alt="Card image cap"/>
            <CardBody>
              <Form>
                <h3>{this.props.questionsCollection[this.state.questionIndex].post_title}</h3>
                {this.renderQuestions()}
                {this.renderNexQuestionButton()}
                {this.renderFinishTestButton()}
              </Form>

            </CardBody>
          </Card>
        </Container>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateListOfTests: (list) => dispatch(updateListOfTests(list)),
  updateQuestionsCollection: (list) => dispatch(updateQuestionsCollection(list))
})

const mapStateToProps = state => ({
  questionsCollection: state.appState.questionsCollection,
  fetchWP: state.appState.fetchWP,
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionUser)
