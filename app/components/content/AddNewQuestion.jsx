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

class AddNewQuestion extends Component {
  constructor (props) {
    super(props)

    this.state = {
      question: '',
      answers: ['', '', '', '', '', ''],
      photoUrl: '',
      correctAnswer: 'option0',
      imageSrc: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    }
  };

  onChangeRadio = (e) => {
    this.setState({correctAnswer: e.target.value})
  }

  onChangePhotoUrl = (e) => {
    this.setState({photoUrl: e.target.value})
  }

  onChangeQuestion = (e) => {
    this.setState({question: e.target.value})
  }
  onClickBtnAddCourse = (e) => {
    let tests = this.props.listOfTests
    tests = tests.concat({title: this.state.testTitle, ID: tests.length + 1})
    this.props.updateListOfTests(tests)
    this.setState({testTitle: ''})
  }

  imageExists (image_url) {
    if ('' === image_url) {
      return false
    }

    var http = new XMLHttpRequest()

    http.open('HEAD', image_url, false)
    http.send()

    return http.status != 404

  }

  onChangeAnswer = (answerNumber, e) => {
    let answers = this.state.answers
    answers[answerNumber] = e.target.value
    this.setState({answers: answers})
  }

  onBlurImageLink = () => {
    console.log(this.imageExists(this.state.photoUrl))
    if (this.imageExists(this.state.photoUrl)) {
      this.setState({imageSrc: this.state.photoUrl})
    } else {
      this.setState({imageSrc: imagePlaceholder})
    }
  }

  onClickBtnAddQuestion = () => {
    let questions = this.props.questionsCollection
    let newQuestion = {}
    newQuestion.imageSrc = this.state.imageSrc
    newQuestion.question = this.state.question
    newQuestion.answer = this.state.answers
    newQuestion.correctAnswer = this.state.correctAnswer
    questions = questions.concat(newQuestion)
    this.props.updateQuestionsCollection(questions)

    this.props.fetchWP.post('question', {question: JSON.stringify(newQuestion)}).then((json) => console.log(json))
  }

  render () {
    return (
      <Col xs={{size: 8, offset: 2}}>
        <Container className="content-add-new-course" fluid>
          <Card>
            <CardImg top width="100%" src={this.state.imageSrc}
                     alt="Card image cap"/>
            <CardBody>
              <Form>
                <FormGroup>
                  <Input onBlur={this.onBlurImageLink} onChange={this.onChangePhotoUrl} value={this.state.photoUrl}
                         type="url" name="url" id="exampleUrl" placeholder="Wprowadź adres URL obrazka"/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Wprowadź treść pytania:</Label>
                  <Input onChange={this.onChangeQuestion} value={this.state.question} type="textarea"
                         name="courseTitleInput" id="exampleText"/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Treść odpowiedzi 1:</Label>
                  <div className="d-flex justify-content-between">
                    <Input onChange={this.onChangeAnswer.bind(this, 0)} value={this.state.answers[0]} type="textarea"
                           name="courseTitleInput" id="exampleText"/>
                    <CustomInput onChange={this.onChangeRadio} value="option0"
                                 checked={this.state.correctAnswer === 'option0'} type="radio" id="firstAnswer"
                                 name="correctAnswer" className="align-self-center"
                                 label="Poprawna" inline/>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Treść odpowiedzi 2:</Label>
                  <div className="d-flex justify-content-between">
                    <Input onChange={this.onChangeAnswer.bind(this, 1)} value={this.state.answers[1]} type="textarea"
                           name="courseTitleInput" id="exampleText"/>
                    <CustomInput onChange={this.onChangeRadio} value="option1"
                                 checked={this.state.correctAnswer === 'option1'} type="radio" id="secondAnswer"
                                 name="correctAnswer" className="align-self-center"
                                 label="Poprawna" inline/>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Treść odpowiedzi 3:</Label>
                  <div className="d-flex justify-content-between">
                    <Input onChange={this.onChangeAnswer.bind(this, 2)} value={this.state.answers[2]} type="textarea"
                           name="courseTitleInput" id="exampleText"/>
                    <CustomInput onChange={this.onChangeRadio} value="option2"
                                 checked={this.state.correctAnswer === 'option2'} type="radio" id="thirdAnswer"
                                 name="correctAnswer" className="align-self-center"
                                 label="Poprawna" inline/>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Treść odpowiedzi 4:</Label>
                  <div className="d-flex justify-content-between">
                    <Input onChange={this.onChangeAnswer.bind(this, 3)} value={this.state.answers[3]} type="textarea"
                           name="courseTitleInput" id="exampleText"/>
                    <CustomInput onChange={this.onChangeRadio} value="option3"
                                 checked={this.state.correctAnswer === 'option3'} type="radio"
                                 className="align-self-center" name="correctAnswer" id="fourthAnswer"
                                 label="Poprawna" inline/>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Treść odpowiedzi 5:</Label>
                  <div className="d-flex justify-content-between">
                    <Input onChange={this.onChangeAnswer.bind(this, 4)} value={this.state.answers[4]} type="textarea"
                           name="courseTitleInput" id="exampleText"/>
                    <CustomInput onChange={this.onChangeRadio} value="option4"
                                 checked={this.state.correctAnswer === 'option4'} type="radio"
                                 className="align-self-center" name="correctAnswer" id="fifthAnswer"
                                 label="Poprawna" inline/>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Treść odpowiedzi 6:</Label>
                  <div className="d-flex justify-content-between">
                    <Input onChange={this.onChangeAnswer.bind(this, 5)} value={this.state.answers[5]} type="textarea"
                           name="courseTitleInput" id="exampleText"/>
                    <CustomInput onChange={this.onChangeRadio} value="option5"
                                 checked={this.state.correctAnswer === 'option5'} type="radio"
                                 className="align-self-center" name="correctAnswer" id="sixthAnswer"
                                 label="Poprawna" inline/>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button onClick={this.onClickBtnAddQuestion} outline color="success">Zapisz pytanie</Button>
                </FormGroup>
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
  courseTitle: state.appState.courseTitle,
  listOfTests: state.appState.listOfTests,
  questionsCollection: state.appState.questionsCollection,
  fetchWP: state.appState.fetchWP,
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewQuestion)
