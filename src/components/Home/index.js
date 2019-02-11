import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
// import Messages from '../Messages';
import Form from '../Form';
import DisplayTable from '../DisplayTable';
import { AuthUserContext } from '../Session';

import { Pane, Heading, Text, Avatar } from 'evergreen-ui';

class HomePage extends Component {
  state = {
    users: null,
    text: 'ljasdfjlasdfkj',
  };

  componentDidMount() {
    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot(snapshot => {
        let users = {};
        snapshot.forEach(doc => (users[doc.id] = doc.data()));

        this.setState({
          users,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => {
          console.log(authUser);
          return (
            <Pane
              height="100%"
              width="100%"
              display="block"
              alignItems="center"
              justifyContent="center"
              background="tint2"
            >
              <Heading size={900}>Hello {authUser.username} </Heading>
              <Avatar
                src={authUser.providerData[0].photoURL}
                name={authUser.username}
                size={50}
              />
              <Text>
                The Home Page is accessible by every signed in user.
              </Text>
              <Form />
              <DisplayTable authUser={authUser} />
            </Pane>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
