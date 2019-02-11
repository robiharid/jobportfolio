import React, { Component } from 'react';
import { TextInput, Button, Paragraph, Dialog } from 'evergreen-ui';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

import { FormWrapper } from './styles';

class Form extends Component {
  state = {
    name: '',
    email: '',
    salary: 0,
    deadline: '',
    location: '',
    link: '',
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onCreateCompany = (event, authUser) => {
    this.props.firebase.userCompanies(authUser.uid).add({
      name: this.state.name,
      email: this.state.email,
      salary: this.state.salary,
      deadline: this.state.deadline,
      location: this.state.location,
      link: this.state.link,
      userId: authUser.uid,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });

    this.setState({
      name: '',
      email: '',
      salary: '',
      deadline: '',
      location: '',
      link: '',
    });

    this.props.closeModal();

    // event.preventDefault();
  };

  render() {
    const {
      name,
      email,
      salary,
      deadline,
      location,
      link,
    } = this.state;

    const { isShown, closeModal } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Dialog
            isShown={isShown}
            title="New Company"
            onCloseComplete={closeModal}
            confirmLabel="Add"
            onConfirm={event => this.onCreateCompany(event, authUser)}
          >
            <FormWrapper>
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
            </FormWrapper>
          </Dialog>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Form);
