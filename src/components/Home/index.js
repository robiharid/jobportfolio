import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import Messages from '../Messages';
import Form from '../Form';
import DisplayTable from '../DisplayTable';
import { AuthUserContext } from '../Session';

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
        {authUser => (
          <div>
            <h1>Home Page</h1>
            <p>
              The Home Page is accessible by every signed in user.
            </p>

            <Messages users={this.state.users} />
            <Form beans={this.state.text} />
            <DisplayTable authUser={authUser} />
          </div>
        )}
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
