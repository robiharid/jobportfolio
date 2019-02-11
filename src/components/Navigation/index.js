import React from 'react';
import { SideSheet, Paragraph, Position } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import {
  AuthedRoutes,
  NonAuthedRoutes,
} from '../../constants/navOptions';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';

//import * as ROLES from '../../constants/roles';

const NavigationAuth = ({ authUser, setNavShown }) => (
  <div>
    {AuthedRoutes.map(option => (
      <Link
        to={option.link}
        style={{ textDecoration: 'none' }}
        onClick={() => setNavShown(false)}
      >
        <Paragraph margin={20}>{option.label}</Paragraph>
      </Link>
    ))}
    <SignOutButton />
  </div>
);

const NavigationNonAuth = ({ setNavShown }) => (
  <div>
    {NonAuthedRoutes.map(option => (
      <Link
        to={option.link}
        style={{ textDecoration: 'none' }}
        onClick={() => setNavShown(false)}
      >
        <Paragraph margin={20}>{option.label}</Paragraph>
      </Link>
    ))}
  </div>
);

const Navigation = ({ isNavShown, setNavShown }) => {
  console.log(isNavShown)
  return (
    <SideSheet
      position={Position.LEFT}
      isShown={isNavShown}
      onCloseComplete={() => setNavShown(false)}
    >
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavigationAuth
              authUser={authUser}
              setNavShown={setNavShown}
            />
          ) : (
            <NavigationNonAuth setNavShown={setNavShown} />
          )
        }
      </AuthUserContext.Consumer>
    </SideSheet>
  );
};

export default Navigation;
