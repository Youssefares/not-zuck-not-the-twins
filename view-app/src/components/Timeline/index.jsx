import React from 'react';
import PropTypes from 'prop-types';

import { Dimmer, Loader, Grid } from 'semantic-ui-react';
import { getFeed } from '../../helpers/requests/posts';
import { friendRequests } from '../../helpers/requests/users';


import Feed from '../Feed';
import Navbar from '../Navbar';

import './Timeline.css';

class TimelineContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      loading: true,
    };
  }

  componentWillMount() {
    friendRequests(this.props.currentUser).then((response) => {
      this.setState({
        requests: response,
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
          friendRequests={this.state.requests}
          deauthenticateUser={this.props.deauthenticateUser}
          currentUser={this.props.currentUser}
          currentName={this.props.currentName}
          currentImage={this.props.currentImage}
        />
        <Feed request={getFeed} userId={this.props.currentUser} />
      </Grid>
    );
  }
}
TimelineContainer.propTypes = {
  deauthenticateUser: PropTypes.func.isRequired,
  currentUser: PropTypes.number.isRequired,
  currentName: PropTypes.string.isRequired,
  currentEmail: PropTypes.string.isRequired,
  currentImage: PropTypes.string.isRequired,
};
export default TimelineContainer;
