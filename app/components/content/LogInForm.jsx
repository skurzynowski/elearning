import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {FormText, CardBody, Card,Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { updateListOfTests } from '../../../redux/appState/actions'

class LogInForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      testTitle: '',
      description: '',
    }
  };

  render () {
    return (
          <Col xs={{size: 8, offset: 2}}>
            <Container className="content-add-new-course" fluid>
              <Card>
                <CardBody>
                  <h3>Please log in</h3>
                  <a href={this.props.loginUrl}>Log in</a>
                  <Form>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>Email</Label>
                      <Col sm={10}>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>Imię</Label>
                      <Col sm={10}>
                        <Input type="email" name="text" id="exampleEmail" placeholder="with a placeholder" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>Nazwisko</Label>
                      <Col sm={10}>
                        <Input type="email" name="text" id="exampleEmail" placeholder="with a placeholder" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="examplePassword" sm={2}>Hasło</Label>
                      <Col sm={10}>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="examplePassword" sm={2}>Powtorz hasło</Label>
                      <Col sm={10}>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 10, offset: 2 }}>
                        <Button>Submit</Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm)
