/// <reference path="./interfaces.d.ts" />

import React, { Component } from "react";
import { Table } from "evergreen-ui";
import firebase from "../../../firebase";

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
    const db = firebase.firestore();
    const companiesRef = db.collection("companies");
    companiesRef
      .doc("2yngzuxQtLzaDAOGsvAM")
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            name: doc.data().name,
            email: doc.data().email,
            salary: doc.data().salary,
            deadline: doc.data().deadline,
            location: doc.data().location
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    companiesRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
      });
    });
  }
  render() {
    const { name, email, salary, deadline, location } = this.state;
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
              <Table.TextCell>{name}</Table.TextCell>
              <Table.TextCell>{email}</Table.TextCell>
              <Table.TextCell>{salary}</Table.TextCell>
              <Table.TextCell>{deadline}</Table.TextCell>
              <Table.TextCell>{location}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
