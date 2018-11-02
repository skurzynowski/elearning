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

  constructor (props) {
    super(props)
    this.state = {
      activePost: {},
    }

    this.fetchPost()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.activePost === prevProps.activePost) {
      return
    }
    console.log(prevProps, this.state)
    this.fetchPost()
  }

  fetchPost = () => {
    // this.setState({activePost: {}})
    var post = new wp.api.models.Post({id: this.props.activePost})
    post.fetch().done(function (post) {
      this.setState({activePost: post})
    }.bind(this))
  }

  render () {
    return (
      <Col xs={8} offset={2}>
        <Grid componentClass="content-post" fluid>
          <Panel>
            {typeof this.state.activePost.title != 'undefined' ?
              <Panel.Heading>{this.state.activePost.title.rendered}</Panel.Heading> : null}
            {typeof this.state.activePost.content != 'undefined' ?
              <Panel.Body dangerouslySetInnerHTML={{__html: this.state.activePost.content.rendered}}/> : null}
          </Panel>
        </Grid>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  activePost: state.appState.activePost,
  fetchWP: state.appState.fetchWP,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
