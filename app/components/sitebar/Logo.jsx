import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../../style/components/sitebar/Logo.scss";

const { propName } = this.props;

const Logo = () => {
  return (
    <div className="sitebar-logo">
      <img src={propName.logoUrl} alt="..." className="img-thumbnail" />
    </div>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  logoUrl: state.appState.logoUrl
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logo);
