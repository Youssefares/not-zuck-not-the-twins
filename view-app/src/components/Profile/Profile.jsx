import React from 'react';
import PropTypes from 'prop-types';

// import { Image, Grid } from 'semantic-ui-react';

import './Profile.css';

const Profile = props => (
  ""
);

Profile.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  image: PropTypes.string,
  gender: PropTypes.string.isRequired,
  hometown: PropTypes.string,
  relationship_status: PropTypes.string,
  created_at: PropTypes.string,
  birthdate: PropTypes.string,
  about: PropTypes.string,
};
export default Profile;
