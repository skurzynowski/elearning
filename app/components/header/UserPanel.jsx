import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../../style/components/header/UserPanel.scss";

// const { propName } = this.props;

const UserPanel = (userName, userSurname) => {
  return (
    <div className="header-user-panel">
      <p>
        {propName.userName} {propName.userSurname}
      </p>
    </div>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  userName: state.appState.userName,
  userSurname: state.appState.userSurname
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
