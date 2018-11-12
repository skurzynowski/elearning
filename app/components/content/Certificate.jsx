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
import StartTestButton from "./StartTestButton";
import {
  setAppMode,
  setCertificateDownloaded
} from "../../../redux/appState/actions";

class Certificate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hiddeButton: false,
      certificateContent: null
    };
    this.props.fetchWP
      .get("certificate")
      .then(json => this.setState({ certificateContent: json.certificate }));
  }

  onClickSave = () => {
    this.setState({ hiddeButton: true });
  };
  componentDidUpdate = () => {
    if (this.state.hiddeButton === true) {
      window.print();
      this.setState({ hiddeButton: false });
      this.props.setAppMode("result");
    }
  };
  renderCertificateContent = () => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: this.state.certificateContent }}
      />
    );
  };

  render() {
    return (
      <Col xs={10} lg={10} md={10} offset={2}>
        <Grid componentClass="content-add-new-course">
          <Panel>
            <Panel.Body>
              <h3>Certyfikat</h3>
              {this.renderCertificateContent()}
              {this.state.hiddeButton ? null : (
                <Button bsStyle="primary" onClick={this.onClickSave}>Zapisz</Button>
              )}
            </Panel.Body>
          </Panel>
        </Grid>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAppMode: list => dispatch(setAppMode(list))
});

const mapStateToProps = state => ({
  listOfTests: state.appState.listOfTests,
  fetchWP: state.appState.fetchWP
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Certificate);
