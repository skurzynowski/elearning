import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
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
      <Col xs={{size: 8, offset: 2}}>
        <Container className="content-add-new-course" fluid>
          <Form>
            <FormGroup>
              <Label for="exampleText">Tytuł testu</Label>
              <Input onChange={this.onChangeTitle} value={this.state.testTitle} type="textarea"
                     name="courseTitleInput" id="exampleText"/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Krótki opis testu</Label>
              <Input onChange={this.onChangeDescription} value={this.state.description} type="textarea"
                     name="courseTitleInput" id="exampleText"/>
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
  updateListOfTests: (list) => dispatch(updateListOfTests(list)),
})

const mapStateToProps = state => ({
  courseTitle: state.appState.courseTitle,
  listOfTests: state.appState.listOfTests,
  fetchWP: state.appState.fetchWP,
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCourse)
