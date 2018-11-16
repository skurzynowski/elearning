import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import fetchWp from "../../utils/fetchWP";
import { connect } from "react-redux";
import {
  setAppMode,
  setActiveSubmodule,
  setActiveModule,
  setCurrentTest,
  setSelectedAnswersDefault
} from "../../../redux/appState/actions";
import "../../../style/components/content/StartModuleButton.scss";

// const { propName } = this.props;

const StartModuleButton = propName => {
  startModule = () => {
    propName.setAppMode("post");
    propName.setActiveModule(parseInt(0));
    propName.setActiveSubmodule("0_0");
    propName.setCurrentTest(null);
    setAnswersDefault();
  };
  return (
    <Button bsStyle="primary" onClick={this.startModule}>
      Rozpocznij naukę
    </Button>
  );
};

const mapDispatchToProps = dispatch => ({
  setAppMode: list => dispatch(setAppMode(list)),
  setActiveSubmodule: list => dispatch(setActiveSubmodule(list)),
  setActiveModule: module => dispatch(setActiveModule(module)),
  setCurrentTest: test => dispatch(setCurrentTest(test)),
  setAnswersDefault: () => dispatch(setSelectedAnswersDefault())
});

const mapStateToProps = state => ({
  fetchWP: state.appState.fetchWP,
  currentTest: state.appState.currentTest
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartModuleButton);
