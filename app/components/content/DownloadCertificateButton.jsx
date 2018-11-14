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
  setCertificateDownloaded
} from "../../../redux/appState/actions";
import "../../../style/components/content/DownloadCertificateButton.scss";

class DownloadCertificateButton extends Component {
  downloadCertyficate = () => {
    this.props.setAppMode("certificate");
    this.props.setActiveModule(parseInt(null));
    this.props.setActiveSubmodule(null);
    this.props.setCurrentTest(null);
  };

  render() {
    return (
      <Button bsStyle="primary" onClick={this.downloadCertyficate}>
        Pobierz certyfikat
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAppMode: list => dispatch(setAppMode(list)),
  setActiveSubmodule: list => dispatch(setActiveSubmodule(list)),
  setActiveModule: module => dispatch(setActiveModule(module)),
  setCurrentTest: test => dispatch(setCurrentTest(test)),
  setCertificateDownloaded: bool => dispatch(setCertificateDownloaded(bool))
});

const mapStateToProps = state => ({
  fetchWP: state.appState.fetchWP,
  currentTest: state.appState.currentTest
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadCertificateButton);
