import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  Button,
  ButtonGroup
} from "react-bootstrap";
import { connect } from "react-redux";
import { setAppMode } from "../../../../redux/appState/actions";
import "./AdminControlBar.scss";

class AdminControlBar extends Component {
  constructor(props) {
    super(props);
  }

  onClickBtnAddCourse = e => {
    this.props.setAppMode("add_course");
  };

  onClickBtnAddQuestion = e => {
    this.props.setAppMode("add_question");
  };

  render() {
    return (
      <Col xs={8} offset={2}>
        <Grid className="admin-control-bar">
          <ButtonGroup>
            <Button
              size="lg"
              onClick={this.onClickBtnAddCourse}
              bsStyle="success"
            >
              Nowy test
            </Button>
            <Button
              size="lg"
              onClick={this.onClickBtnAddQuestion}
              bsStyle="info"
            >
              Nowe pytanie
            </Button>
          </ButtonGroup>
        </Grid>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAppMode: list => dispatch(setAppMode(list))
});

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminControlBar);
