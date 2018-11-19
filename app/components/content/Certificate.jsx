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
import jsPDF from 'jspdf'

import fetchWp from '../../utils/fetchWP'
import { connect } from 'react-redux'
import StartTestButton from './StartTestButton'
import {
  setAppMode,
  setCertificateDownloaded
} from '../../../redux/appState/actions'

import * as HmtlToPdf from '../../utils/htmlToPdf'

class Certificate extends Component {
  renderCertificateContent = () => {
    return (
      <div  id="nodeToRenderAsPDF"
           dangerouslySetInnerHTML={{__html: this.props.certificate}}
      />
    )
  }

  render () {
    return (
      <Col xs={10} lg={10} md={10} offset={2}>
        <Grid componentClass="content-add-new-course">
          <Panel style={{width: '210mm', height: '298mm'}}>
              {this.renderCertificateContent()}
              {/*{this.state.hiddeButton ? null : (*/}
              {/*<Button bsStyle="primary" onClick={this.onClickSave}>Zapisz</Button>*/}
              {/*)}*/}
          </Panel>
        </Grid>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setAppMode: list => dispatch(setAppMode(list))
})

const mapStateToProps = state => ({
  listOfTests: state.appState.listOfTests,
  certificate: state.appState.certificate,
  fetchWP: state.appState.fetchWP
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Certificate)
