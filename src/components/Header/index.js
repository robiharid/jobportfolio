import React from 'react';
import { Button } from 'evergreen-ui';

const Header = ({ setNavShown }) => (
  <Button
    height={32}
    marginRight={16}
    appearance="minimal"
    iconBefore="menu"
    onClick={() => setNavShown(true)}
  >
  </Button>
);

export default Header;
