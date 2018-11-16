import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Col, Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { setAppMode } from "../../../redux/appState/actions";
import "../../../style/components/content/AdminControlBar.scss";

// const { propName } = this.props;

const AdminControlBar = propName => {
  onClickBtnAddCourse = e => {
    propName.setAppMode("add_course");
  };

  onClickBtnAddQuestion = e => {
    setAppMode("add_question");
  };

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
          <Button size="lg" onClick={this.onClickBtnAddQuestion} bsStyle="info">
            Nowe pytanie
          </Button>
        </ButtonGroup>
      </Grid>
    </Col>
  );
};

const mapDispatchToProps = dispatch => ({
  setAppMode: list => dispatch(setAppMode(list))
});

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminControlBar);
