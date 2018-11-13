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
import {
  setActiveModule,
  setAppMode,
  setCurrentTest,
  setActiveSubmodule,
  setProgress
} from '../../../redux/appState/actions'

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activePost: {},
      modules: this.props.modules,
      subModuleIndex: 0,
      moduleIndex: 0,
      filteredStates: [],
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.activeSubmodule !== nextProps.activeSubmodule) {
      this.setState({moduleIndex: nextProps.activeModule, subModuleIndex: nextProps.activeSubmodule[2]})
    }
  }

  componentDidMount () {
    this.setState({moduleIndex: this.props.activeModule, subModuleIndex: this.props.activeSubmodule[2]})
  }

  onClickNextSubmoduleButton = () => {
    this.props.setActiveSubmodule(
      this.state.moduleIndex + '_' + parseInt(this.state.subModuleIndex + 1)
    )
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
    this.props.setProgress(this.props.progress + this.props.moduleKeys.length)
    this.props.setAppMode('test')
  }

  isLastSubmodule = () => {
    return (
      (!this.state.modules[this.state.moduleIndex].fields[
        'module_content_' + (parseInt(this.state.subModuleIndex) + parseInt(1))] ||
        !this.state.modules[this.state.moduleIndex].fields[
        'module_title_' + (parseInt(this.state.subModuleIndex) + parseInt(1))])
    )
  }

  isLastModule = () => {
    var module_index = parseInt(this.state.moduleIndex) + parseInt(1)
    return (!this.state.modules[module_index] || typeof this.state.modules[module_index] === 'undefined')

  }

  onClickPreviousModule = () => {
    let indexOfActiveSubmodule = this.props.moduleKeys.indexOf(this.props.activeSubmodule)
    this.props.setActiveSubmodule(this.props.moduleKeys[indexOfActiveSubmodule - 1])
    this.props.setActiveModule(this.props.moduleKeys[indexOfActiveSubmodule - 1][0])
  }
  renderPreviousButton = () => {
    if (this.props.activeSubmodule == '0_0') {
      return
    }
    return (
      <Button bsStyle="primary" className="btn-left" onClick={this.onClickPreviousModule} bsSize="large">
        Wstecz
      </Button>
    )
  }
  renderNextButton = () => {
    if (!this.isLastSubmodule()) {
      return (
        <Button bsStyle="primary" className="btn-right" onClick={this.onClickNextSubmoduleButton} bsSize="large">
          Dalej
        </Button>
      )
    } else {
      if (this.isLastModule()) {
        return (
          <Button bsStyle="primary" onClick={this.onClickStartLastTest} bsSize="large">
            Test końcowy
          </Button>
        )
      } else {
        return (
          <Button bsStyle="primary" onClick={this.onClickNextModuleButton} bsSize="large">
            Następny moduł
          </Button>
        )
      }
    }
  }

  render () {
    return (
      <Col>
        <Grid componentClass="content-post">
          {!!this.state.modules[this.state.moduleIndex].post_title ? (
            <h3>{this.state.modules[this.state.moduleIndex].post_title}</h3>
          ) : null}
          <Panel>
            {typeof this.state.modules[this.state.moduleIndex].fields[
            'module_title_' + this.state.subModuleIndex
              ] != 'undefined' ? (
              <Panel.Heading>
                {
                  this.state.modules[this.state.moduleIndex].fields[
                  'module_title_' + this.state.subModuleIndex
                    ]
                }
              </Panel.Heading>
            ) : null}
            {typeof this.state.modules[this.state.moduleIndex].fields[
            'module_content_' + this.state.subModuleIndex
              ] != 'undefined' ? (
              <Panel.Body
                dangerouslySetInnerHTML={{
                  __html: this.state.modules[this.state.moduleIndex].fields[
                  'module_content_' + this.state.subModuleIndex
                    ]
                }}
              />
            ) : null}
            <div className="post-btn-container">
              {this.renderPreviousButton()}
              {this.renderNextButton()}
            </div>
          </Panel>
        </Grid>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setAppMode: mode => dispatch(setAppMode(mode)),
  setCurrentTest: test => dispatch(setCurrentTest(test)),
  setActiveModule: module => dispatch(setActiveModule(module)),
  setActiveSubmodule: module => dispatch(setActiveSubmodule(module)),
  setProgress: progress => dispatch(setProgress(progress)),
})

const mapStateToProps = state => ({
  activePost: state.appState.activePost,
  fetchWP: state.appState.fetchWP,
  modules: state.appState.modules,
  activeSubmodule: state.appState.activeSubmodule,
  activeModule: state.appState.activeModule,
  moduleKeys: state.appState.moduleKeys,
  progress: state.appState.progress,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
