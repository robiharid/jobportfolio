import React, { Component } from 'react'
import { DisplayTable, Form} from '../../shared'

export default class Profile extends Component {
  render() {
    return (
      <div>
        Profile
        <DisplayTable></DisplayTable>

        <Form></Form>
      </div>
    )
  }
}
