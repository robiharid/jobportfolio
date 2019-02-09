/// <reference path="./interfaces.d.ts" />

import React, { Component } from "react"
import { TextInput, Button, Paragraph } from "evergreen-ui"
import firebase from "firebase"

// https://evergreen.segment.com/components/table

console.log(process.env.REACT_APP_FIREBASE_DB)

// // name
// email
// salary
// deadline
// location

export default class Form extends Component {
  state = {
    name: "",
    email: "",
    salary: 0,
    deadline: "",
    location: "",
    link: ""
  }

  handleInputChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitForm = () => {
    const { name, email, salary, deadline, location, link } = this.state

    const db = firebase.firestore()

    const companiesRef = db.collection("companies")

    companiesRef.add({
      email,
      name,
      salary,
      deadline,
      location,
      link
    })

    this.setState({
      email: "",
      name: "",
      salary: 0,
      deadline: "",
      location: "",
      link: ""
    })
  }

  render() {
    const { name, email, salary, deadline, location, link } = this.state
    return (
      <div>
        <Paragraph>Name</Paragraph>
        
        <TextInput
          onChange={this.handleInputChange}
          value={name}
          name="name"
          type="text"
        />

        <Paragraph>Email</Paragraph>

        <TextInput
          onChange={this.handleInputChange}
          value={email}
          name="email"
          type="email"
        />

        <Paragraph>Salary</Paragraph>

        <TextInput
          onChange={this.handleInputChange}
          value={salary}
          name="salary"
          type="number"
        />

        <Paragraph>Deadline</Paragraph>

        <TextInput
          onChange={this.handleInputChange}
          value={deadline}
          name="deadline"
          type="text"
        />

        <Paragraph>Location</Paragraph>

        <TextInput
          onChange={this.handleInputChange}
          value={location}
          name="location"
          type="text"
        />

        <Paragraph>Link</Paragraph>

        <TextInput
          onChange={this.handleInputChange}
          value={link}
          name="link"
          type="text"
        />
        <Button onClick={this.submitForm}>Submit</Button>
      </div>
    )
  }
}
