import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import CourseTitle from "./CourseTitle";
import ProgressBar from "./ProgressBar";
import UserPanel from "./UserPanel";
import Timer from "./Timer";

export default class Header extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col className="d-flex header-wraper">
            <CourseTitle />
            <ProgressBar />
            <UserPanel />
            <Timer />
          </Col>
        </Row>
      </Grid>
    );
  }
}
