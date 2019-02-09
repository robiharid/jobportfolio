/// <reference path="./interfaces.d.ts" />

import React, { Component } from "react"
import { TextInput, Button, Paragraph, toaster } from "evergreen-ui"
import firebase from "../../../firebase"

export default class Form extends Component {
  state = {
    name: "",
    email: "",
    salary: 0,
    deadline: "",
    location: "",
    link: "",
    errorMessage: ""
  }

  handleInputChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitForm = () => {
    let user = ""
    try {
      user = firebase.auth().currentUser.email
    } catch {
      user = undefined
    }

    const { name, email, salary, deadline, location, link } = this.state

    const companyToAdd = {
      name,
      email,
      salary,
      deadline,
      location,
      link
    }

    if (user) {
      const db = firebase.firestore()

      const userRef = db.collection("users").doc(user)

      userRef.collection("companies").add(companyToAdd)

      this.setState({
        email: "",
        name: "",
        salary: 0,
        deadline: "",
        location: "",
        link: ""
      })
    } else {
      toaster.danger('You are not signed in.')
    }
  }

  render() {
    const { name, email, salary, deadline, location, link, errorMessage} = this.state
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
    );
  }
}
