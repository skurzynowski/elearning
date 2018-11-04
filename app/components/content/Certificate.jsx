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
import { setAppMode, setCertificateDownloaded } from '../../../redux/appState/actions'

class Certificate extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  onClickSave = () => {
    this.setState({hiddeButton: true})
    this.props.setCertificateDownloaded()
  }
  componentDidUpdate = () => {
    if (this.state.hiddeButton === true) {
      window.print()
      this.setState({hiddeButton: false})
      this.props.setAppMode('result')
    }
  }

  render () {
    return (
      <Col xs={8} offset={2}>
        <Grid componentClass="content-add-new-course" fluid>
          <Panel>
            <Panel.Body>
              <h3>Certyfikat</h3>
              <p>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?"
              </p>
              {this.state.hiddeButton ? null : <Button onClick={this.onClickSave}>Zapisz</Button>}
            </Panel.Body>
          </Panel>
        </Grid>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setAppMode: (list) => dispatch(setAppMode(list)),
  setCertificateDownloaded: () => dispatch(setCertificateDownloaded())
})

const mapStateToProps = state => ({
  listOfTests: state.appState.listOfTests,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Certificate)
