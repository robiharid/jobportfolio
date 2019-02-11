import React, { Component } from 'react';
import { Button } from 'evergreen-ui';
import Form from '../Form';
import DisplayTable from '../DisplayTable'
import {
  ProfileWrapper,
  ProfileLeftColumn,
  ProfileRightColumn,
} from './styles';
import { AuthUserContext } from '../Session';

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
      { authUser => (
        <ProfileWrapper>
        <ProfileLeftColumn>
          <Button onClick={this.openModal}>New Company</Button>
        </ProfileLeftColumn>

        <ProfileRightColumn>
          <Form
            isShown={this.state.formModalShown}
            closeModal={this.closeModal}
          />
          <DisplayTable authUser={authUser}></DisplayTable>
        </ProfileRightColumn>
      </ProfileWrapper>
      )

      }
      
      </AuthUserContext.Consumer>
    );
  }
}
