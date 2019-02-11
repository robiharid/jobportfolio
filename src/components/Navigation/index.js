import React from 'react';
import { SideSheet, Paragraph, Position } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import {
  AuthedRoutes,
  NonAuthedRoutes,
} from '../../constants/navOptions';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import { SignInGoogle } from '../SignIn';
import { NavWrapper, NavItem } from './styles';

//import * as ROLES from '../../constants/roles';

const NavigationAuth = ({ authUser, setNavShown }) => (
  <div>
    {AuthedRoutes.map((option, index) => (
      <NavItem key={index}>
        <Link
          to={option.link}
          style={{ textDecoration: 'none' }}
          onClick={() => setNavShown(false)}
        >
          <Paragraph>{option.label}</Paragraph>
        </Link>
      </NavItem>
    ))}
    <NavItem>
      <SignOutButton />
    </NavItem>
  </div>
);

const NavigationNonAuth = ({ setNavShown }) => (
  <div>
    {NonAuthedRoutes.map((option, index) => (
      <NavItem key={index}>
        <Link
          to={option.link}
          style={{ textDecoration: 'none' }}
          onClick={() => setNavShown(false)}
        >
          <Paragraph>{option.label}</Paragraph>
        </Link>
      </NavItem>
    ))}
    <NavItem>
      <SignInGoogle />
    </NavItem>
  </div>
);

const Navigation = ({ isNavShown, setNavShown }) => {
  return (
    <SideSheet
      position={Position.LEFT}
      isShown={isNavShown}
      onCloseComplete={() => setNavShown(false)}
    >
      <NavWrapper>
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
      </NavWrapper>
    </SideSheet>
  );
};

export default Navigation;
