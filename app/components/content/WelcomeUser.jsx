import React, { Component } from "react";
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
  Panel
} from "react-bootstrap";
import fetchWp from "../../utils/fetchWP";
import { connect } from "react-redux";
import StartTestButton from "./StartTestButton";
import jsPDF from "jspdf";

const imagePlaceholder =
  "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";

class WelcomeUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderCourseOptions = () => {
    return this.props.listOfTests.map(function(data) {
      return (
        <option key={data.slug} value={data.slug}>
          {data.name}
        </option>
      );
    });
  };

  onChangeCourse = e => {
    this.setState({ courseSlug: e.target.value });
  };

  render() {
    return (
      <Col>
        <Grid componentClass="content-add-new-course">
          <Panel>
            <Panel.Body>
              <h3>Witaj w strefie e-learning</h3>
              <p>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?"
              </p>
              <StartTestButton />
            </Panel.Body>
          </Panel>
        </Grid>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  listOfTests: state.appState.listOfTests
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeUser);
