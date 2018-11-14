import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import "../../../style/components/header/CourseTitle.scss";

class CourseTitle extends Component {
  render() {
    return (
      <div className="header-course-title">
        <h2>{this.props.courseTitle}</h2>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  courseTitle: state.appState.courseTitle
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseTitle);
