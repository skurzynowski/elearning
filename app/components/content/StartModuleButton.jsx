import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  Button,
  Panel
} from "react-bootstrap";
import fetchWp from "../../utils/fetchWP";
import { connect } from "react-redux";
import {
  setAppMode,
  setActiveSubmodule,
  setActiveModule,
  setCurrentTest
} from "../../../redux/appState/actions";

class StartModuleButton extends Component {
  startModule = () => {
    this.props.setAppMode("post");
    this.props.setActiveModule(parseInt(0));
    this.props.setActiveSubmodule("0_0");
    this.props.setCurrentTest(null);
  };

  render() {
    return (
      <Button bsStyle="primary" onClick={this.startModule}>
        Rozpocznij naukę
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAppMode: list => dispatch(setAppMode(list)),
  setActiveSubmodule: list => dispatch(setActiveSubmodule(list)),
  setActiveModule: module => dispatch(setActiveModule(module)),
  setCurrentTest: test => dispatch(setCurrentTest(test))
});

const mapStateToProps = state => ({
  fetchWP: state.appState.fetchWP,
  currentTest: state.appState.currentTest
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartModuleButton);
