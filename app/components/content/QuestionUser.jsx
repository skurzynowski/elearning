import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ListGroupItem,
  ListGroup,
  ControlLabel,
  Button,
  Panel,
  Radio
} from "react-bootstrap";
import fetchWp from "../../utils/fetchWP";
import { connect } from "react-redux";
import {
  updateAnswers,
  updateQuestionsCollection,
  updateListOfTests,
  setAppMode,
  setTestResults,
  setCurrentTest
} from "../../../redux/appState/actions";

import LightBox from "./LightBox";

const imagePlaceholder =
  "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";

class QuestionUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      questionsCollection: this.props.questionsCollection,
      selectedAnswer: "",
      finishBtnClicked: false,
      selectedImages: []
    };
  }

  updateAnswers = () => {
    let answers = this.props.selectedAnswers;
    answers = answers.concat({
      questionId: this.props.questionsCollection[this.state.questionIndex].ID,
      answer: this.state.selectedAnswer
    });

    this.props.updateAnswers(answers);
  };
  onClickNextQuestion = () => {
    this.updateAnswers();
    this.setState({
      questionIndex: this.state.questionIndex + 1,
      selectedAnswer: ""
    });
  };
  renderCourseOptions = () => {
    return this.props.listOfTests.map(function(data) {
      return (
        <option key={data.slug} value={data.slug}>
          {data.name}
        </option>
      );
    });
  };

  onChangeRadio = e => {
    this.setState({ selectedAnswer: e.target.value });
  };
  renderQuestions = () => {
    let questions = this.props.questionsCollection[this.state.questionIndex]
      .answer;

    return questions.map(
      function(data) {
        if (data.value !== "") {
          let html_id = data.key + "_id_" + this.state.questionIndex;

          return (
            <ListGroupItem active={this.activeAnswer(data.key)}>
              <FormGroup key={this.state.selectedIndex + data.key}>
                <ControlLabel
                  style={{ textAlign: "left" }}
                  className={"btn btn-block"}
                  htmlFor={html_id}
                >
                  <Radio
                    inline
                    style={{ textAlign: "left", display: "none" }}
                    onChange={this.onChangeRadio}
                    value={data.key}
                    checked={this.state.selectedAnswer === data.key}
                    type="radio"
                    id={html_id}
                    name="correctAnswer"
                  />
                  {data.value}
                </ControlLabel>
              </FormGroup>
            </ListGroupItem>
          );
        }
      }.bind(this)
    );
  };

  activeAnswer = key => {
    return this.state.selectedAnswer == key;
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedAnswers !== this.props.selectedAnswers &&
      this.state.finishBtnClicked === true
    ) {
      this.props.fetchWP
        .post("check/result", {
          selectedAnswers: JSON.stringify(nextProps.selectedAnswers)
        })
        .then(json => this.props.setTestResults(json.result))
        .then(this.props.setAppMode("result"));
    }
  }

  onClickFinishTest = () => {
    this.state.finishBtnClicked = true;
    this.updateAnswers();
  };

  renderFinishTestButton = () => {
    if (
      this.state.selectedAnswer !== "" &&
      this.props.questionsCollection.length - 1 === this.state.questionIndex
    ) {
      return (
        <FormGroup>
          <Button bsStyle="primary" onClick={this.onClickFinishTest}>Zakończ test</Button>
        </FormGroup>
      );
    }
    if (
      this.props.questionsCollection.length - 1 ===
      this.state.questionIndex
    ) {
      return (
        <FormGroup>
          <Button bsStyle="primary" onClick={this.onClickFinishTest} disabled>
            Zakończ test
          </Button>
        </FormGroup>
      );
    }
  };

  renderNexQuestionButton = () => {
    if (
      this.state.selectedAnswer !== "" &&
      this.props.questionsCollection.length - 2 >= this.state.questionIndex
    ) {
      return (
        <FormGroup>
          <Button bsStyle="primary" onClick={this.onClickNextQuestion}>Następne pytanie</Button>
        </FormGroup>
      );
    }
  };
  onClickImage = () => {
    // this.setState({
    //   selectedImages: this.state.selectedImages.concat(
    //     this.props.questionsCollection[this.state.questionIndex].imageSrc
    //   )
    // });
    // this.props.toggleLightbox();
  };

  render() {
    return (
      <Col>
        <Grid componentClass="content-add-new-course">
          {typeof this.state.selectedImages[0] != "undefined" ? (
            <LightBox imageUrl={this.state.selectedImages} />
          ) : null}
          <Panel>
            <img
              onClick={this.onClickImage}
              src={
                this.props.questionsCollection[this.state.questionIndex]
                  .imageSrc
              }
              alt="..."
              className="img-thumbnail"
            />
            <Panel.Body>
              <Form>
                <h3>
                  {
                    this.props.questionsCollection[this.state.questionIndex]
                      .post_title
                  }
                </h3>
                <ListGroup>{this.renderQuestions()}</ListGroup>
                {this.renderNexQuestionButton()}
                {this.renderFinishTestButton()}
              </Form>
            </Panel.Body>
          </Panel>
        </Grid>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateListOfTests: list => dispatch(updateListOfTests(list)),
  updateQuestionsCollection: list => dispatch(updateQuestionsCollection(list)),
  updateAnswers: answers => dispatch(updateAnswers(answers)),
  setAppMode: mode => dispatch(setAppMode(mode)),
  setTestResults: results => dispatch(setTestResults(results)),
  setCurrentTest: testSlug => dispatch(setCurrentTest(testSlug))
});

const mapStateToProps = state => ({
  questionsCollection: state.appState.questionsCollection,
  fetchWP: state.appState.fetchWP,
  selectedAnswers: state.appState.selectedAnswers,
  listOfTests: state.appState.listOfTests,
  currentTest: state.appState.currentTest
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionUser);
