import React from 'react';
import PropTypes from 'prop-types';

import { List, Image, Grid } from 'semantic-ui-react';
import './Profile.css';

const Profile = props => (
  <Grid.Row>
    <Grid width={16} id="content">
      <Grid.Row>
        <Grid.Column width={4}>
          <Image src={props.image} />
        </Grid.Column>
        <Grid.Column width={8}>
          <h2>{props.name} {props.last_name}({props.nickname})</h2>
          <p>About: {props.about} </p>
          <List>
            <List.Item>
              <List.Icon name="user" />
              <List.Content>Gender: {props.gender}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="heartbeat" />
              <List.Content>{props.relationship_status}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="calendar" />
              <List.Content>Member since: {props.created_at}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="marker" />
              <List.Content>{props.hometown}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="birthday" />
              <List.Content>{props.birthdate}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="mail" />
              <List.Content>
                <a href={`mailto:${props.email}`}>{props.email}</a>
              </List.Content>
            </List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={4}>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Grid.Row>
);

Profile.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  image: PropTypes.string,
  gender: PropTypes.string,
  hometown: PropTypes.string,
  relationship_status: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  birthdate: PropTypes.string,
  about: PropTypes.string,
};

Profile.defaultProps = {
  image: './user.png',
  hometown: 'No Hometown',
  gender: 'Prefers not to specify',
  relationship_status: 'single',
  birthdate: 'not given',
  about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus volutpat laoreet.\
    Etiam consectetur et diam sed elementum. Mauris malesuada in magna et pharetra.',
};

export default Profile;
