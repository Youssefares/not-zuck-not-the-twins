import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Dimmer, Loader, Grid } from 'semantic-ui-react';

import Post from '../Post';

class FeedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: [],
    };
  }

  componentWillMount() {
    this.props.request(this.props.userId).then((response) => {
      this.setState({
        posts: response,
        loading: false,
      });
    });
  }


  posts() {
    return this.state.posts.map(post => (
      <Post
        userId={post.user_id}
        userImage={post.user_image || undefined}
        body={post.body}
        created_at={post.created_at}
        isPublic={post.is_public}
      />
    ));
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
      <Grid.Row id="content" columns={1}>
        <Grid.Column>
          <Feed>
            {this.posts()}
          </Feed>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

FeedComponent.propTypes = {
  request: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
export default FeedComponent;
