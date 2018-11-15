import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Checked from  '../../icons/checked-checkbox-16.png'

const style = {heigth: '16px', width: '16px', marginRight: '4px'}

export default class CheckedIcon extends Component {
  render () {
    return (
      <img style={style} src={Checked} alt="..."/>
    )
  }
}


