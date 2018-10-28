import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { connect } from 'react-redux'
import {updateListOfTests} from '../../../redux/appState/actions'

class AddNewCourse extends Component {
  constructor (props) {
    super(props)

    this.state = {
      testTitle: '',
    }
  };

  onChangeTextArea = (e) => {
    this.setState({testTitle:e.target.value})
  }
  onClickBtnAddCourse = (e) => {
    let tests = this.props.listOfTests;
    tests = tests.concat({title:this.state.testTitle, ID: tests.length + 1});
    this.props.updateListOfTests(tests);
    this.setState({testTitle: ''});
  }

  render () {
    return (
      <Col xs={{size: 8, offset: 2}}>
        <Container className="content-add-new-course" fluid>
          <Form>
            <FormGroup>
              <Label for="exampleText">Wprowadź tytuł kursu i wciśnij OK</Label>
              <Input onChange={this.onChangeTextArea} value={this.state.testTitle} type="textarea" name="courseTitleInput" id="exampleText"/>
            </FormGroup>
            <FormGroup>
              <Button onClick={this.onClickBtnAddCourse} outline color="success">Dodaj</Button>
            </FormGroup>
          </Form>
        </Container>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateListOfTests: (list) => dispatch(updateListOfTests(list))
})

const mapStateToProps = state => ({
  courseTitle: state.appState.courseTitle,
  listOfTests: state.appState.listOfTests
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCourse)
