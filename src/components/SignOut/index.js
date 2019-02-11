import React from 'react';

import { withFirebase } from '../Firebase';
import {Button } from 'evergreen-ui'

const SignOutButton = ({ firebase }) => (
  <Button appearance="primary" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
