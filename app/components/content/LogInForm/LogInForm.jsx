import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FormText,
  Panel,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
import { connect } from "react-redux";
import { updateListOfTests } from "../../../../redux/appState/actions";
import "./LogInForm.scss";

class LogInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testTitle: "",
      description: ""
    };
  }

  render() {
    return (
      <Col xs={8} offset={2}>
        <Grid componentClass="content-add-new-course">
          <Panel>
            <Panel.Body>
              <h3>Please log in</h3>
              <a href={this.props.loginUrl}>Log in</a>
              <Form>
                <FormGroup row>
                  <ControlLabel sm={2}>Email</ControlLabel>
                  <Col sm={10}>
                    <FormControl
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <ControlLabel sm={2}>Imię</ControlLabel>
                  <Col sm={10}>
                    <FormControl
                      type="email"
                      name="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <ControlLabel sm={2}>Nazwisko</ControlLabel>
                  <Col sm={10}>
                    <FormControl
                      type="email"
                      name="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <ControlLabel sm={2}>Hasło</ControlLabel>
                  <Col sm={10}>
                    <FormControl
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="password placeholder"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <ControlLabel sm={2}>Powtorz hasło</ControlLabel>
                  <Col sm={10}>
                    <FormControl
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="password placeholder"
                    />
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Panel.Body>
          </Panel>
        </Grid>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateListOfTests: list => dispatch(updateListOfTests(list))
});

const mapStateToProps = state => ({
  courseTitle: state.appState.courseTitle,
  listOfTests: state.appState.listOfTests,
  fetchWP: state.appState.fetchWP
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInForm);
