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
import { setActiveModule, setAppMode, setCurrentTest, setActiveSubmodule } from '../../../redux/appState/actions'

class Post extends Component {

  constructor (props) {
    super(props)
    this.state = {
      activePost: {},
      modules: this.props.modules,
      subModuleIndex: 0,
      moduleIndex: 0,
    }

  }

  componentDidUpdate = (prevProps) => {
    if (this.props.activePost === prevProps.activePost) {
      return
    }
  }

  onClickNextSubmoduleButton = () => {
    this.props.setActiveSubmodule(this.state.moduleIndex + '_' + parseInt(this.state.subModuleIndex + 1))
    this.setState({subModuleIndex: this.state.subModuleIndex + 1})
    // this.forceUpdate()
  }

  onClickNextModuleButton = () => {
    let newModuleIndex = parseInt(this.state.moduleIndex + 1)
    this.props.setActiveModule(newModuleIndex)
    this.props.setActiveSubmodule(newModuleIndex + '_0')
    this.setState({subModuleIndex: 0, moduleIndex: newModuleIndex})
  }

  onClickStartLastTest = () => {
    this.props.setActiveSubmodule(null)
    this.props.setActiveModule(null)
    this.props.setCurrentTest('post-test')
    this.props.setAppMode('test')
  }

  isLastSubmodule = () => {
    return (typeof this.state.modules[this.state.moduleIndex].fields['module_content_' + (parseInt(this.state.subModuleIndex) + parseInt(1))] == 'undefined' ||
       this.state.modules[this.state.moduleIndex].fields['module_content_' + (parseInt(this.state.subModuleIndex) + parseInt(1))] == '') &&
      ( typeof this.state.modules[this.state.moduleIndex].fields['module_title_' + (parseInt(this.state.subModuleIndex) + parseInt(1))] == 'undefined' ||
        this.state.modules[this.state.moduleIndex].fields['module_title_' + (parseInt(this.state.subModuleIndex) + parseInt(1))] == '')
  }

  isLastModule = () => {
    var module_index = this.state.moduleIndex + parseInt(1)
    return (typeof this.state.modules[module_index] == 'undefined') || (
      (this.state.modules[module_index].fields['module_content_0'] == '' ||
        this.state.modules[module_index].fields['module_title_0'] == '')
    )
  }

  renderNextButton = () => {
    if (!this.isLastSubmodule()) {
      return <Button onClick={this.onClickNextSubmoduleButton} bsSize="large">Dalej</Button>
    } else {
      if (this.isLastModule()) {
        return <Button onClick={this.onClickStartLastTest} bsSize="large">Test końcowy</Button>
      } else {
        return <Button onClick={this.onClickNextModuleButton} bsSize="large">Następny moduł</Button>
      }
    }
  }

  render () {
    return (
      <Col xs={8} offset={2}>
        <Grid componentClass="content-post" fluid>
          {typeof this.state.modules[this.state.moduleIndex].post_title != 'undefined' ?
            <h3>{this.state.modules[this.state.moduleIndex].post_title}</h3> : null}
          <Panel>
            {typeof this.state.modules[this.state.moduleIndex].fields['module_title_' + this.state.subModuleIndex] != 'undefined' ?
              <Panel.Heading>{this.state.modules[this.state.moduleIndex].fields['module_title_' + this.state.subModuleIndex]}</Panel.Heading> : null}
            {typeof this.state.modules[this.state.moduleIndex].fields['module_content_' + this.state.subModuleIndex] != 'undefined' ?
              <Panel.Body
                dangerouslySetInnerHTML={{__html: this.state.modules[this.state.moduleIndex].fields['module_content_' + this.state.subModuleIndex]}}/> : null}
            <Panel.Body>
              {this.renderNextButton()}
            </Panel.Body>
          </Panel>
        </Grid>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setAppMode: (mode) => dispatch(setAppMode(mode)),
  setCurrentTest: (test) => dispatch(setCurrentTest(test)),
  setActiveModule: (module) => dispatch(setActiveModule(module)),
  setActiveSubmodule: (module) => dispatch(setActiveSubmodule(module)),
})

const mapStateToProps = state => ({
  activePost: state.appState.activePost,
  fetchWP: state.appState.fetchWP,
  modules: state.appState.modules,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
