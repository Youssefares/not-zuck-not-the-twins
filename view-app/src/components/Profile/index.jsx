import React from 'react';
import PropTypes from 'prop-types';

import Profile from './Profile';
import { Dimmer, Loader, Grid } from 'semantic-ui-react';

import { showUser, friendRequests, requestFriend } from '../../helpers/requests/users';
import { getPosts } from '../../helpers/requests/posts';


import Navbar from '../Navbar';
import Feed from '../Feed';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {},
      requests: []
    };
    this.sendFriendRequest = this.sendFriendRequest.bind(this);
  }

  componentWillMount() {
    showUser(this.props.userId).then((response) => {
      this.setState({
        user: response.user,
        loading: false,
      });
    });
  }

  componentDidMount() {
    friendRequests(this.props.currentUser).then((response) => {
      this.setState({
        requests: response,
      });
    });
  }

  sendFriendRequest() {
    requestFriend(this.props.currentUser, this.state.user.id).then((response)=> {
      this.setState({
        requestSent: 'Request Sent',
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
          friendRequests={this.state.requests}
          deauthenticateUser={this.props.deauthenticateUser}
          currentUser={this.props.currentUser}
          currentName={this.props.currentName}
          currentImage={this.props.currentImage}
        />
        <Profile
          add_friend={this.state.requestSent === 'Request Sent' || this.state.user.id === this.props.currentUser}
          sendRequest={this.sendFriendRequest}
          requestSent={this.requestSent}
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
  deauthenticateUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  currentUser: PropTypes.number.isRequired,
  currentName: PropTypes.string.isRequired,
  currentEmail: PropTypes.string.isRequired,
  currentImage: PropTypes.string.isRequired,
};
export default ProfileContainer;
