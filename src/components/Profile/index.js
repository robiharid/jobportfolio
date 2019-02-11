import React, { Component } from 'react';
import { Button, Avatar, Heading } from 'evergreen-ui';
import Form from '../Form';
import DisplayTable from '../DisplayTable';
import {
  ProfileWrapper,
  ProfileLeftColumn,
  ProfileRightColumn,
} from './styles';
import { AuthUserContext } from '../Session';

const columnButtonClasses = {
  classOne: 'profileItem',
  classTwo: 'columnButton',
};
export default class Profile extends Component {
  state = {
    formModalShown: false,
  };

  closeModal = () => {
    this.setState({
      formModalShown: false,
    });
  };

  openModal = () => {
    this.setState({
      formModalShown: true,
    });
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <ProfileWrapper>
            <ProfileLeftColumn>
              <Heading size={900}>Hello {authUser.username}</Heading>
              <Avatar
                className="profileItem"
                src={authUser.providerData[0].photoURL}
                name={authUser.username}
                size={50}
              />
              <Button
                className={`${columnButtonClasses.classOne} ${
                  columnButtonClasses.classTwo
                }`}
                appearance="primary"
                onClick={this.openModal}
              >
                New Company
              </Button>
            </ProfileLeftColumn>

            <ProfileRightColumn>
              <Form
                isShown={this.state.formModalShown}
                closeModal={this.closeModal}
              />
              <DisplayTable authUser={authUser} />
            </ProfileRightColumn>
          </ProfileWrapper>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
