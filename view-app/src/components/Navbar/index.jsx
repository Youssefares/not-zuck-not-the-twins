import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import { Input, Menu, Image, Grid } from 'semantic-ui-react';

const Navbar = props => (
  <Grid.Row id="navbar">
    <Menu id="menu" secondary>
      <Menu.Item id="nameandimage">
        <Image id="websiteimage" src="./turned_myself.png" size="small" wrapped />
        <NavLink to="/timeline" replace>
          <h3 id="innerwebsitename">social-network-c137</h3>
        </NavLink>
      </Menu.Item>
      <Menu.Menu secondary id="actions">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item id="me">
          <Image id="meimage" src="./user.png" size="small" />
          <NavLink to="/me" replace>
            {`Signed in as ${props.currentName}`}
          </NavLink>
        </Menu.Item>
        <Menu.Item name="logout" />
      </Menu.Menu>
    </Menu>
  </Grid.Row>
);


Navbar.propTypes = {
  currentName: PropTypes.string.isRequired,
  currentImage: PropTypes.string.isRequired,
};
export default Navbar;
