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
  Radio
} from 'react-bootstrap'
import fetchWp from '../../utils/fetchWP'
import { connect } from 'react-redux'
import {
  updateAnswers,
  updateQuestionsCollection,
  updateListOfTests,
  setAppMode,
  setTestResults,
  setCurrentTest,
} from '../../../redux/appState/actions'

const imagePlaceholder = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'

class QuestionUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questionIndex: 0,
      questionsCollection: this.props.questionsCollection,
      selectedAnswer: '',
      finishBtnClicked: false,
    }
  };

  updateAnswers = () => {
    let answers = this.props.selectedAnswers
    answers = answers.concat({
      questionId: this.props.questionsCollection[this.state.questionIndex].ID,
      answer: this.state.selectedAnswer
    })

    this.props.updateAnswers(answers)
  }
  onClickNextQuestion = () => {
    this.updateAnswers()
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
              <ControlLabel>
              <Radio onChange={this.onChangeRadio} value={data.key}
                     checked={this.state.selectedAnswer === data.key} type="radio"
                     id={data.key + '_id_' + this.state.questionIndex}
                     name="correctAnswer" inline/>
                <div style={{fontSize:"16px",display:'inline'}}>{data.value}</div>
              </ControlLabel>
          </FormGroup>)
      }
    }.bind(this))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedAnswers !== this.props.selectedAnswers && this.state.finishBtnClicked === true) {
      this.props.fetchWP.post('check/result', {selectedAnswers: JSON.stringify(nextProps.selectedAnswers)})
        .then((json) => this.props.setTestResults(json.result)).then(this.props.setAppMode('result'))
    }
  }

  onClickFinishTest = () => {
    this.state.finishBtnClicked = true
    this.updateAnswers()

  }

  renderFinishTestButton = () => {
    if (this.props.questionsCollection.length - 1 === this.state.questionIndex) {
      return (
        <FormGroup>
          <Button onClick={this.onClickFinishTest}>Zakończ test</Button>
        </FormGroup>
      )
    }
  }

  renderNexQuestionButton = () => {
    if (this.state.selectedAnswer !== '' && this.props.questionsCollection.length - 2 >= this.state.questionIndex) {
      return (<FormGroup>
          <Button onClick={this.onClickNextQuestion}>Następne pytanie</Button>
        </FormGroup>
      )
    }
  }

  render () {
    return (
      <Col xs={8} offset={2}>
        <Grid componentClass="content-add-new-course" fluid>
          <Panel>
            <img src={this.props.questionsCollection[this.state.questionIndex].imageSrc} alt="..."
                 className="img-thumbnail"/>
            <Panel.Body>
              <Form>
                <h3>{this.props.questionsCollection[this.state.questionIndex].post_title}</h3>
                {this.renderQuestions()}
                {this.renderNexQuestionButton()}
                {this.renderFinishTestButton()}
              </Form>
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
  updateAnswers: (answers) => dispatch(updateAnswers(answers)),
  setAppMode: (mode) => dispatch(setAppMode(mode)),
  setTestResults: (results) => dispatch(setTestResults(results)),
  setCurrentTest: (testSlug) => dispatch(setCurrentTest(testSlug)),
})

const mapStateToProps = state => ({
  questionsCollection: state.appState.questionsCollection,
  fetchWP: state.appState.fetchWP,
  selectedAnswers: state.appState.selectedAnswers,
  listOfTests: state.appState.listOfTests,
  currentTest: state.appState.currentTest,
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionUser)
