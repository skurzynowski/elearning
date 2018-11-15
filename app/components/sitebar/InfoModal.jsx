import React, { Component } from 'react'
import { setNotAllowed } from '../../../redux/appState/actions'
import { Grid, Modal, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class InfoModal extends Component {
  handleClick = () => {
    this.props.setNotAllowed({status: false, info: {}})
  }

  render () {
    const { body, btn} = this.props.notAllowed.info
    return (
      <div className="static-modal">
        <Modal.Dialog style={{marginTop: '35vh'}}>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleClick}>{btn}</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setNotAllowed: status => dispatch(setNotAllowed(status)),
})

const mapStateToProps = state => ({
  notAllowed: state.appState.notAllowed,
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal)






