import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../../style/components/header/CourseTitle.scss";

// const { propName } = this.props;

const CourseTitle = propName => {
  return (
    <div className="header-course-title">
      <h2>{propName.courseTitle}</h2>
    </div>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  courseTitle: state.appState.courseTitle
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseTitle);
