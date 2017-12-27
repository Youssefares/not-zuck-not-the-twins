import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Card, Modal, Button, Input, Menu, Image, Grid } from 'semantic-ui-react';

import { deauthenticateUser } from '../../helpers/auth';
import FriendRequest from '../FriendRequest';

const Navbar = props => (
  <Grid.Row id="navbar">
    <Menu id="menu" secondary>
      <Menu.Item id="nameandimage">
        <Image id="websiteimage" src="/turned_myself.png" size="small" wrapped />
        <NavLink to="/timeline" replace>
          <h3 id="innerwebsitename">social-network-c137</h3>
        </NavLink>
      </Menu.Item>
      <Menu.Menu secondary id="actions">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item>
          <Modal trigger={<Button>Friend Requests</Button>}>
            <Modal.Header>Friend Requests</Modal.Header>
            <Modal.Content image>
              <Card.Group>
                {
                  props.friendRequests.map(user => (
                    <FriendRequest
                      currentUser={props.currentUser}
                      userId={user.id}
                      userEmail={user.email}
                      userName={user.name}
                      userLastName={user.last_name}
                      userNickname={user.nickname}
                      userImage={user.image || undefined}
                    />
                  ))
                }
              </Card.Group>
            </Modal.Content>
          </Modal>
        </Menu.Item>
        <Menu.Item id="me">
          <Image id="meimage" src="/user.png" size="small" />
          <NavLink to="/me" replace>
            {`Signed in as ${props.currentName}`}
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/logout" onClick={() => { deauthenticateUser(); props.deauthenticateUser(); }}>
          Logout
          </NavLink>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </Grid.Row>
);


Navbar.propTypes = {
  friendRequests: PropTypes.array.isRequired,
  deauthenticateUser: PropTypes.func.isRequired,
  currentUser: PropTypes.number.isRequired,
  currentName: PropTypes.string.isRequired,
  currentImage: PropTypes.string.isRequired,
};
export default Navbar;
