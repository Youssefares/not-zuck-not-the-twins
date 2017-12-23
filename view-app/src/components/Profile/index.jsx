import React from 'react';
import PropTypes from 'prop-types';

import Profile from './Profile';
import { Dimmer, Loader, Grid } from 'semantic-ui-react';

import { showUser } from '../../helpers/requests/users';
import { getPosts } from '../../helpers/requests/posts';


import Navbar from '../Navbar';
import Feed from '../Feed';

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
        user: response.user,
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
          email={this.state.user.email || undefined}
          name={this.state.user.name || undefined}
          last_name={this.state.user.last_name || undefined}
          nickname={this.state.user.nickname || undefined}
          image={this.state.user.image || undefined}
          gender={this.state.user.gender || undefined}
          hometown={this.state.user.hometown || undefined}
          relationship_status={this.state.user.relationship_status || undefined}
          created_at={this.state.user.created_at || undefined}
          birthdate={this.state.user.birthdate || undefined}
          about={this.state.user.about || undefined}
        />
        <Feed request={getPosts} userId={this.props.userId}/>
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
