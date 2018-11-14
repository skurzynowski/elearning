import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  ControlLabel,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Panel,
  Image,
  Radio
} from "react-bootstrap";
import fetchWp from "../../utils/fetchWP";
import { connect } from "react-redux";
import {
  updateQuestionsCollection,
  updateListOfTests
} from "../../../redux/appState/actions";
import "../../../style/components/content/AddNewQuestion.scss";

const imagePlaceholder =
  "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";

class AddNewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      answers: ["", "", "", "", "", ""],
      photoUrl: "",
      correctAnswer: "option0",
      imageSrc:
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
      courseSlug: "test-1",
      attachmentId: ""
    };
  }

  onChangeRadio = e => {
    this.setState({ correctAnswer: e.target.value });
  };

  onChangePhotoUrl = e => {
    this.setState({ photoUrl: e.target.value });
  };

  onChangeQuestion = e => {
    this.setState({ question: e.target.value });
  };

  onClickBtnAddCourse = e => {
    let tests = this.props.listOfTests;
    tests = tests.concat({ title: this.state.testTitle, ID: tests.length + 1 });
    this.props.updateListOfTests(tests);
    this.setState({ testTitle: "" });
  };

  imageExists = image_url => {
    if ("" === image_url) {
      return false;
    }

    let http = new XMLHttpRequest();

    http.open("HEAD", image_url, false);
    http.send();

    return http.status != 404;
  };

  onChangeAnswer = (answerNumber, e) => {
    let answers = this.state.answers;
    answers[answerNumber] = e.target.value;
    this.setState({ answers: answers });
  };

  onBlurImageLink = () => {
    console.log(this.imageExists(this.state.photoUrl));
    if (this.imageExists(this.state.photoUrl)) {
      this.setState({ imageSrc: this.state.photoUrl });
    } else {
      this.setState({ imageSrc: imagePlaceholder });
    }
  };

  onClickBtnAddQuestion = () => {
    let questions = this.props.questionsCollection;
    let newQuestion = {};
    newQuestion.imageSrc = this.state.imageSrc;
    newQuestion.question = this.state.question;
    newQuestion.answer = this.state.answers;
    newQuestion.correctAnswer = this.state.correctAnswer;
    newQuestion.courseSlug = this.state.courseSlug;
    newQuestion.attachmentId = this.state.attachmentId;
    questions = questions.concat(newQuestion);

    this.props.fetchWP
      .post("question", { question: JSON.stringify(newQuestion) })
      .then(() =>
        this.props.fetchWP
          .get("course")
          .then(json => this.props.updateListOfTests(json.tests))
      );
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

  onChangeCourse = e => {
    this.setState({ courseSlug: e.target.value });
  };

  onClickSelectImage = () => {
    if (frame) {
      frame.open();
      return;
    }
    // Create a new media frame
    let frame = wp.media({
      title: "Wybierz obrazek dla pytania",
      button: {
        text: "Wybierz"
      },
      multiple: false // Set to true to allow multiple files to be selected
    });
    frame.open();
    frame.on(
      "select",
      function() {
        // Get media attachment details from the frame state
        var attachment = frame
          .state()
          .get("selection")
          .first()
          .toJSON();
        this.setState({
          imageSrc: attachment.url,
          attachmentId: attachment.id
        });
      }.bind(this)
    );
  };

  render() {
    return (
      <Col xs={8} offset={2}>
        <Grid componentClass="content-add-new-course">
          <Panel>
            <Panel.Heading>Dodaj pytanie:</Panel.Heading>
            <Image src={this.state.imageSrc} rounded />
            <Panel.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Wybierz test</ControlLabel>
                  <FormControl
                    onChange={this.onChangeCourse}
                    value={this.state.courseSlug}
                    componentClass="select"
                    name="select"
                  >
                    {this.renderCourseOptions()}
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <Button onClick={this.onClickSelectImage} bsStyle="primary">
                    Wybierz obrazek
                  </Button>
                  {/*<FormControl onBlur={this.onBlurImageLink} onChange={this.onChangePhotoUrl} value={this.state.photoUrl}*/}
                  {/*type="url" name="url" id="exampleUrl" placeholder="Wprowadź adres URL obrazka"/>*/}
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Wprowadź treść pytania:</ControlLabel>
                  <FormControl
                    onChange={this.onChangeQuestion}
                    value={this.state.question}
                    componentClass="textarea"
                    name="courseTitleInput"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Treść odpowiedzi 1:</ControlLabel>
                  <div className="d-flex justify-content-between">
                    <FormControl
                      onChange={this.onChangeAnswer.bind(this, 0)}
                      value={this.state.answers[0]}
                      componentClass="textarea"
                      name="courseTitleInput"
                    />
                    <Radio
                      onChange={this.onChangeRadio}
                      value="option0"
                      checked={this.state.correctAnswer === "option0"}
                      name="correctAnswer"
                      className="align-self-center"
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Treść odpowiedzi 2:</ControlLabel>
                  <div className="d-flex justify-content-between">
                    <FormControl
                      onChange={this.onChangeAnswer.bind(this, 1)}
                      value={this.state.answers[1]}
                      componentClass="textarea"
                      name="courseTitleInput"
                      id="exampleText"
                    />
                    <Radio
                      onChange={this.onChangeRadio}
                      value="option1"
                      checked={this.state.correctAnswer === "option1"}
                      id="secondAnswer"
                      name="correctAnswer"
                      className="align-self-center"
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Treść odpowiedzi 3:</ControlLabel>
                  <div className="d-flex justify-content-between">
                    <FormControl
                      onChange={this.onChangeAnswer.bind(this, 2)}
                      value={this.state.answers[2]}
                      componentClass="textarea"
                      name="courseTitleInput"
                      id="exampleText"
                    />
                    <Radio
                      onChange={this.onChangeRadio}
                      value="option2"
                      checked={this.state.correctAnswer === "option2"}
                      id="thirdAnswer"
                      name="correctAnswer"
                      className="align-self-center"
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Treść odpowiedzi 4:</ControlLabel>
                  <div className="d-flex justify-content-between">
                    <FormControl
                      onChange={this.onChangeAnswer.bind(this, 3)}
                      value={this.state.answers[3]}
                      componentClass="textarea"
                      name="courseTitleInput"
                      id="exampleText"
                    />
                    <Radio
                      onChange={this.onChangeRadio}
                      value="option3"
                      checked={this.state.correctAnswer === "option3"}
                      className="align-self-center"
                      name="correctAnswer"
                      id="fourthAnswer"
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Treść odpowiedzi 5:</ControlLabel>
                  <div className="d-flex justify-content-between">
                    <FormControl
                      onChange={this.onChangeAnswer.bind(this, 4)}
                      value={this.state.answers[4]}
                      componentClass="textarea"
                      name="courseTitleInput"
                      id="exampleText"
                    />
                    <Radio
                      onChange={this.onChangeRadio}
                      value="option4"
                      checked={this.state.correctAnswer === "option4"}
                      className="align-self-center"
                      name="correctAnswer"
                      id="fifthAnswer"
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Treść odpowiedzi 6:</ControlLabel>
                  <div className="d-flex justify-content-between">
                    <FormControl
                      onChange={this.onChangeAnswer.bind(this, 5)}
                      value={this.state.answers[5]}
                      componentClass="textarea"
                      name="courseTitleInput"
                      id="exampleText"
                    />
                    <Radio
                      onChange={this.onChangeRadio}
                      value="option5"
                      checked={this.state.correctAnswer === "option5"}
                      className="align-self-center"
                      name="correctAnswer"
                      id="sixthAnswer"
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button
                    onClick={this.onClickBtnAddQuestion}
                    bsStyle="success"
                  >
                    Zapisz pytanie
                  </Button>
                </FormGroup>
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
  updateQuestionsCollection: list => dispatch(updateQuestionsCollection(list))
});

const mapStateToProps = state => ({
  courseTitle: state.appState.courseTitle,
  listOfTests: state.appState.listOfTests,
  questionsCollection: state.appState.questionsCollection,
  fetchWP: state.appState.fetchWP
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewQuestion);
