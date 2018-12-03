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
import {
  setCertificate,
  setAppMode, setActiveSubmodule, setActiveModule, setCurrentTest, setCertificateDownloaded
} from '../../../redux/appState/actions'
import * as HmtlToPdf from '../../utils/htmlToPdf'

class DownloadCertificateButton extends Component {

  constructor (props) {
    super(props)
    this.state = {
      downladed: false,
      previousState: '',
    }
  }

  downloadCertyficate = () => {
    this.props.fetchWP
      .get('certificate')
      .then((json) => { this.props.setCertificate(json.certificate) })
      .then(
        () => {
          //zapisz poprzedni stan w tym komponencie
          this.props.setAppMode('certificate')
          this.props.setActiveModule(parseInt(null))
          this.props.setActiveSubmodule(null)
        }
      ).then(() => {
      HmtlToPdf.print()
    }).then(() => {
      this.setState({downladed: true})
      //odtwórz poprzedni stan
    })
  }

  isDisabled = () => {
    return this.state.downladed
  }

  componentDidUpdate () {
  }

  render () {
    return (
      <Button disabled={this.isDisabled()} bsStyle="primary" onClick={this.downloadCertyficate}>Pobierz
        certyfikat</Button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setAppMode: list => dispatch(setAppMode(list)),
  setActiveSubmodule: list => dispatch(setActiveSubmodule(list)),
  setActiveModule: (module) => dispatch(setActiveModule(module)),
  setCurrentTest: (test) => dispatch(setCurrentTest(test)),
  setCertificateDownloaded: (bool) => dispatch(setCertificateDownloaded(bool)),
  setCertificate: (certificate) => dispatch(setCertificate(certificate)),
})

const mapStateToProps = state => ({
  fetchWP: state.appState.fetchWP,
  currentTest: state.appState.currentTest,
  passedTest: state.appState.passedTest
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadCertificateButton)
