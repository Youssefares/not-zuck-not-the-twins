import React from 'react';
import PropTypes from 'prop-types';

import Profile from './Profile';
import { Dimmer, Loader, Grid } from 'semantic-ui-react';

import { showUser } from '../../helpers/requests/users';
import Navbar from '../Navbar';

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
      <Grid>
        <Navbar 
          currentName={this.props.currentName}
          currentImage={this.props.currentImage}
        />
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
      </Grid>
    );
  }
}

ProfileContainer.propTypes = {
  userId: PropTypes.number.isRequired,
  currentUser: PropTypes.number.isRequired,
  currentName: PropTypes.string.isRequired,
  currentEmail: PropTypes.string.isRequired,
  currentImage: PropTypes.string.isRequired,
};
export default ProfileContainer;
