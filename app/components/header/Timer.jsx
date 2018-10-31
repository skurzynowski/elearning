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
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  countDown = () => {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    if (seconds == 0) {
      clearInterval(this.timer);
    }
  };

  addLeadingZeros = value => {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  };

  render() {
    return (
      <div>
        <h3 style={{ margin: "30px" }}>
          {this.addLeadingZeros(this.state.time.m)}:{this.addLeadingZeros(
            this.state.time.s
          )}
          <button onClick={this.startTimer}>Start</button>
        </h3>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  setAppMode: state.appState.setAppMode
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
