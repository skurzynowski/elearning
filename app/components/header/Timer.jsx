import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Timer extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 600 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime = secs => {
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      m: minutes,
      s: seconds
    };
    return obj;
  };

  componentDidMount = () => {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  };

  startTimer = () => {
    if (
      this.props.questionsCollection.length > 0 &&
      this.timer == 0 &&
      this.state.seconds > 0
    ) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  countDown = () => {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    if (this.props.testResults.percents >= 0 || seconds == 0) {
      clearInterval(this.timer);
      this.disableCheckboxes();
    }
  };

  addLeadingZeros = value => {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  };

  disableCheckboxes = () => {
    let checkboxes = document.querySelectorAll(".radio-inline input");
    checkboxes.forEach(checkbox => {
      checkbox.disabled = true;
    });
  };

  render() {
    return (
      <div>
        <h3 style={{ margin: "30px" }}>
          {this.addLeadingZeros(this.state.time.m)}:{this.addLeadingZeros(
            this.state.time.s
          )}
        </h3>
        {this.startTimer()}
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  questionsCollection: state.appState.questionsCollection,
  testResults: state.appState.testResults
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
