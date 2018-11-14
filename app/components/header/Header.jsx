import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import CourseTitle from "./CourseTitle";
import ProgressBar from "./ProgressBar";
import UserPanel from "./UserPanel";
import "../../../style/components/header/Header.scss";

const Header = () => {
  return (
    <Grid fluid>
      <Row>
        <Col className="col-sm-offset-6 col-sm-6">
          <ProgressBar />
        </Col>
      </Row>
    </Grid>
  );
};

export default Header;
