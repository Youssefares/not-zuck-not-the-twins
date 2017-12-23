import React from 'react';
import PropTypes from 'prop-types';

import Profile from './Profile';
import { showUser } from '../../helpers/requests/users';
import { Dimmer, Loader } from 'semantic-ui-react';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {},
    };
  }

  componentWillMount() {
    showUser(this.props.userId).then((response) => {
      this.setState({
        user: response.result,
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    }
    return (
      <Profile
        email={this.state.user.email}
        name={this.state.user.name}
        last_name={this.state.user.last_name}
        nickname={this.state.user.nickname}
        image={this.state.user.image}
        gender={this.state.user.gender}
        hometown={this.state.user.hometown}
        relationship_status={this.state.user.relationship_status}
        created_at={this.state.user.created_at}
        birthdate={this.state.user.birthdate}
        about={this.state.user.about}
      />
    );
  }
}

ProfileContainer.propTypes = {
  userId: PropTypes.number.isRequired,
};
export default ProfileContainer;
