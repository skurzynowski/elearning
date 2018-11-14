import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../../style/components/header/UserPanel.scss";

class UserPanel extends Component {
  render() {
    return (
      <div className="header-user-panel">
        <p>
          {this.props.userName} {this.props.userSurname}
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  userName: state.appState.userName,
  userSurname: state.appState.userSurname
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
