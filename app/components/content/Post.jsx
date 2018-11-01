import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
} from 'react-bootstrap'
import fetchWp from '../../utils/fetchWP'
import { connect } from 'react-redux'
import StartTestButton from './StartTestButton'

class Post extends Component {

  render () {
    return (
      <Col xs={8} offset={2}>
        <Grid componentClass="content-post" fluid>
          <Panel>
            <Panel.Heading>{this.props.activePost.post_title}</Panel.Heading>
            <Panel.Body
              dangerouslySetInnerHTML={{__html: this.props.activePost.post_content}}/>
          </Panel>
        </Grid>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  activePost: state.appState.activePost,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
