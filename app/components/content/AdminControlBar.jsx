import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, ButtonGroup } from 'reactstrap'
import { connect } from 'react-redux'
import { setAppMode } from '../../../redux/appState/actions'

class AdminControlBar extends Component {
  constructor (props) {
    super(props)
  };

  onClickBtnAddCourse = (e) => {
    this.props.setAppMode('add_course');
  }

  onClickBtnAddQuestion = (e) => {
    this.props.setAppMode('add_question');
  }

  render () {
    return (
      <Col xs={{size: 8, offset: 2}}>
        <Container className="admin-control-bar">
          <ButtonGroup>
            <Button size="lg" onClick={this.onClickBtnAddCourse} outline color="success">Nowy test</Button>
            <Button size="lg" onClick={this.onClickBtnAddQuestion} outline color="info">Nowe pytanie</Button>
          </ButtonGroup>
        </Container>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setAppMode: (list) => dispatch(setAppMode(list)),
})

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminControlBar)
