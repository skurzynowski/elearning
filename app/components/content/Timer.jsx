import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  FormControl,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  Button,
  Panel,
  Radio
} from "react-bootstrap";

class Timer extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 600, counter: 1 };
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

  showQuestionNumber = () => {
    return <span>Pytanie X z {this.props.questionsCollection.length}</span>;
  };

  clock = () => {
    return (
      <React.Fragment>
        <span>
          {this.addLeadingZeros(this.state.time.m)}:{this.addLeadingZeros(
            this.state.time.s
          )}
        </span>
        {this.startTimer()}
      </React.Fragment>
    );
  };

  render() {
    const panelStyle = {
      display: "flex",
      justifyContent: "space-between",
      margin: "10px 0",
      fontSize: "24px"
    };

    const divStyle = {
      height: "5px",
      width: "100%",
      background: "tomato",
      marginBottom: "20px"
    };

    return (
      <Col xs={8} offset={2}>
        <div style={panelStyle}>
          {this.showQuestionNumber()}
          {this.clock()}
        </div>
        <div style={divStyle} />
      </Col>
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
