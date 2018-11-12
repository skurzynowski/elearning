import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import CourseTitle from "../CourseTitle/CourseTitle";
import ProgressBar from "../ProgressBar/ProgressBar";
import UserPanel from "../UserPanel/UserPanel";

export default class Header extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col className="col-sm-offset-6 col-sm-6">
            <ProgressBar />
          </Col>
        </Row>
      </Grid>
    );
  }
}
