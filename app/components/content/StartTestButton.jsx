import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import fetchWp from "../../utils/fetchWP";
import { connect } from "react-redux";
import {
  updateQuestionsCollection,
  updateListOfTests,
  setAppMode,
  updateAnswers,
  setSelectedAnswersDefault
} from "../../../redux/appState/actions";
import "../../../style/components/content/StartTestButton.scss";

// const { propName } = this.props;

const StartTestButton = propName => {
  getQuestions = event => {
    propName.setAnswersDefault();
    propName.fetchWP
      .get("question/" + propName.currentTest)
      .then(json => propName.updateQuestionsCollection(json.question))
      .then(propName.setAppMode("test"));
  };

  componentWillReceiveProps = newProps => {};

  const text =
    currentTest == "post-test" &&
    selectedAnswers.length === questionsCollection.length
      ? "Powtórz test"
      : "Rozpocznij test";

  return (
    <Button className="btn-primary" onClick={getQuestions}>
      {text}
    </Button>
  );
};

const mapDispatchToProps = dispatch => ({
  updateQuestionsCollection: list => dispatch(updateQuestionsCollection(list)),
  setAppMode: list => dispatch(setAppMode(list)),
  setAnswersDefault: () => dispatch(setSelectedAnswersDefault())
});

const mapStateToProps = state => ({
  fetchWP: state.appState.fetchWP,
  currentTest: state.appState.currentTest,
  globalAppMode: state.appState.globalAppMode,
  currentTest: state.appState.currentTest,
  selectedAnswers: state.appState.selectedAnswers,
  questionsCollection: state.appState.questionsCollection
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartTestButton);
