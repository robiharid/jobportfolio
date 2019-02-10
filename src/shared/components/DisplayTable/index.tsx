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

type iState = {
  userCompanies: {
    name: string,
    email: string,
    salary: number,
    deadline: string,
    location: string,
    id: string
  }[],
  errorMessage: string
}

export default class DisplayTable extends Component{
  // state: Readonly<IState> = {
  //   userCompanies: [],
  //   errorMessage: ""
  // };
  state: iState = {
    userCompanies: [],
    errorMessage:""
  }

  componentDidMount() {
    const db = firebase.firestore();

    let user = "";

    try {
      user = firebase.auth().currentUser.email;
      console.log(user);

      const currUserCompanies: any = [];

      if (user) {
        console.log(user);
        const userCompaniesRef = db
          .collection("users")
          .doc(user)
          .collection("companies");

        userCompaniesRef
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, doc.data());
              console.log(doc.id, doc);
              let currDoc = doc.data();
              currDoc.id = doc.id;

              currUserCompanies.push(currDoc);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(user);
        this.setState({
          errorMessage: "User not authenticated"
        });
      }

      this.setState({
        userCompanies: [currUserCompanies]
      });
    } catch (error) {
      console.log(error);
      user = undefined;
    }
  }
  render() {
    // const { name, email, salary, deadline, location } = this.state;
    console.log("state", this.state);
    return (
      <Table>
        {JSON.stringify(this.state)}
        <Table.SearchHeaderCell />
        <Table.Head>
          {/* <Table.TextHeaderCell>Logo</Table.TextHeaderCell> */}
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Email</Table.TextHeaderCell>
          <Table.TextHeaderCell>Salary</Table.TextHeaderCell>
          <Table.TextHeaderCell>Deadline</Table.TextHeaderCell>
          <Table.TextHeaderCell>Location</Table.TextHeaderCell>
          <Table.TextHeaderCell>ID</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {this.state.userCompanies.map((company) => {
            console.log("company", company)
            return (
              <Table.Row key={company.id} isSelectable onSelect={() => alert(company.name)}>
                {/* <Table.TextCell>{profile.logo}</Table.TextCell> */}
                <Table.TextCell>{company.name}</Table.TextCell>
                <Table.TextCell>{company.email}</Table.TextCell>
                <Table.TextCell>{company.salary}</Table.TextCell>
                <Table.TextCell>{company.deadline}</Table.TextCell>
                <Table.TextCell>{company.location}</Table.TextCell>
                <Table.TextCell>{company.id}</Table.TextCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}
