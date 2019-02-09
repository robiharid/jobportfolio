/// <reference path="./interfaces.d.ts" />

import React, { Component } from "react";
import { Table } from "evergreen-ui";
import firebase from "../../../firebase";

var database = firebase
  .database()
  .ref()
  .child("companies")
  .child("company");

// https://evergreen.segment.com/components/table
const profiles = [
  {
    id: "adjfdlkf",
    logo: "coming soon",
    name: "First Derivatives",
    email: "jobs@fd.com",
    salary: "£30,000",
    deadline: "10/01/2019",
    location: "Newry, Ireland"
  }
];

export default class DisplayTable extends Component {
  state = {
    name: "",
    email: "",
    salary: "",
    deadline: "",
    location: ""
  };

  componentDidMount() {
    database.on("value", snap => {
      console.log(snap.val().name);
      this.setState({
        name: snap.val().name,
        email: snap.val().email,
        salary: snap.val().salary,
        deadline: snap.val().deadline,
        location: snap.val().location
      });
    });
  }
  render() {
    return (
      <Table>
        <Table.SearchHeaderCell />
        <Table.Head>
          <Table.TextHeaderCell>Logo</Table.TextHeaderCell>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Email</Table.TextHeaderCell>
          <Table.TextHeaderCell>Salary</Table.TextHeaderCell>
          <Table.TextHeaderCell>Deadline</Table.TextHeaderCell>
          <Table.TextHeaderCell>Location</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {profiles.map(profile => (
            <Table.Row
              key={profile.id}
              isSelectable
              onSelect={() => alert(profile.name)}
            >
              <Table.TextCell>{profile.logo}</Table.TextCell>
              <Table.TextCell>{this.state.name}</Table.TextCell>
              <Table.TextCell>{profile.email}</Table.TextCell>
              <Table.TextCell>{profile.salary}</Table.TextCell>
              <Table.TextCell>{profile.deadline}</Table.TextCell>
              <Table.TextCell>{profile.location}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
