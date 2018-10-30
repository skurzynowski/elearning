import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Grid, Panel, Row, Col, Form, FormGroup, FormControl,  ControlLabel, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateListOfTests } from '../../../redux/appState/actions'

class AddNewCourse extends Component {
  constructor (props) {
    super(props)

    this.state = {
      testTitle: '',
      description: '',
    }
  };

  onChangeTitle = (e) => {
    this.setState({testTitle: e.target.value})
  }
  onChangeDescription = (e) => {
    this.setState({description: e.target.value})
  }
  onClickBtnAddCourse = (e) => {
    this.props.fetchWP.post('course', {
      course: JSON.stringify({
        title: this.state.testTitle,
        description: this.state.description
      })
    }).then(
      (json) => {
        this.props.updateListOfTests(json.tests)
        this.setState({testTitle: ''})
        this.setState({description: ''})
      }
    )
  }

  render () {
    return (
      <Col xs={8}  offset={2}>
        <Grid componentClass="content-add-new-course" fluid>
          <Panel>
            <Panel.Heading>Dodaj kurs:</Panel.Heading>
            <Panel.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Tytuł testu</ControlLabel>
                  <FormControl onChange={this.onChangeTitle} value={this.state.testTitle} componentClass="textarea"
                               name="courseTitleInput"/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Krótki opis testu</ControlLabel>
                  <FormControl onChange={this.onChangeDescription} value={this.state.description} componentClass="textarea"
                               name="courseTitleInput"/>
                </FormGroup>
                <FormGroup>
                  <Button onClick={this.onClickBtnAddCourse}    bsStyle="success">Dodaj</Button>
                </FormGroup>
              </Form>
            </Panel.Body>
          </Panel>
        </Grid>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateListOfTests: (list) => dispatch(updateListOfTests(list)),
})

const mapStateToProps = state => ({
  courseTitle: state.appState.courseTitle,
  listOfTests: state.appState.listOfTests,
  fetchWP: state.appState.fetchWP,
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCourse)
