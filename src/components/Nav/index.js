import React from 'react';
import { SideSheet, Paragraph, Position } from 'evergreen-ui';
import { Link } from 'react-router-dom';

const Nav = ({ isShown, setShown, navOptions }) => (
  <SideSheet
    position={Position.LEFT}
    isShown={isShown}
    onCloseComplete={() => setShown(false)}
  >
    {/* <Paragraph margin={20}>Welcome {user}</Paragraph> */}

    {navOptions.map(option => (
      <Link
        to={option.link}
        style={{ textDecoration: 'none' }}
        onClick={() => setShown(false)}
      >
        <Paragraph margin={20}>{option.label}</Paragraph>
      </Link>
    ))}
  </SideSheet>
);
export default Nav;
