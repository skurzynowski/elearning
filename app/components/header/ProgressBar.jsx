import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { Progress } from 'reactstrap'

class ProgressBar extends Component {
  render () {
    return (
      <div className="header-progress-bar">
        <div className="text-left">Ukończenie kursu {this.props.progress}%</div>
        <Progress value={this.props.progress}/>
      </div>
    )
  }
}

const mapDispatchToProps = ({})

const mapStateToProps = state => ({
  progress: state.appState.progress
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar)
