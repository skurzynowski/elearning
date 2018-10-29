import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import Header from '../components/header/Header'
import { connect } from 'react-redux'
import { toggleUserLogginStatus } from '../../redux/appState/actions'
import SiteBarAdmin from '../components/sitebar/SiteBarAdmin'
import AddNewCourse from '../components/content/AddNewCourse'
import AddNewQuestion from '../components/content/AddNewQuestion'

class Shortcode extends Component {

  constructor (props) {
    super(props)
  };

  render () {
    return (
      <Container fluid>
        <Row>
          <Col xs="2">
            <SiteBarAdmin/>
          </Col>
          <Col xs="10">
            <Header/>
            {this.props.appGlobalMode === 'add_question' ? <AddNewQuestion/> : null}
            {this.props.appGlobalMode === 'add_course' ? <AddNewCourse/> : null}
          </Col>
        </Row>
      </Container>
    )
  }
}

Shortcode.propTypes = {
  wpObject: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
  toggleUserLogginStatus: (status) => dispatch(toggleUserLogginStatus(status))
})

const mapStateToProps = state => ({
  isUserLoggedIn: state.appState.isUserLoggedIn,
  appGlobalMode: state.appState.appGlobalMode,
})

export default connect(mapStateToProps, mapDispatchToProps)(Shortcode)