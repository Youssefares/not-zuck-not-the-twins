import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Checkbox, Button, Form, Feed, Dimmer, Loader, Grid } from 'semantic-ui-react';

import Post from '../Post';
import { currentUser } from '../../helpers/auth';
import { post } from '../../helpers/requests/posts';

class FeedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      is_public: false,
      posts: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.createPost = this.createPost.bind(this);
    this.updatePublic = this.updatePublic.bind(this);
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
        userId={post.user.id}
        userName={post.user.name}
        userNickname={post.user.nickname}
        userImage={post.user.picture || undefined}
        body={post.body}
        created_at={post.created_at}
        isPublic={post.is_public}
      />
    ));
  }

  createPost() {
    post(this.props.userId, this.state.body, this.state.is_public).then((response) => {
      this.setState({
        body: '',
        is_public: false,
        posts: [response].concat(this.state.posts),
      });
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  updatePublic() {
    this.setState({
      is_public: !this.state.is_public,
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
    if (this.props.userId === currentUser()) {
      return (
        <Grid id="content" width={16}>
          <Grid.Row columns={2}>
            <Grid.Column width={16}>
              <Form onSubmit={this.createPost}>
                <Form.Field
                  control={TextArea}
                  name="body"
                  placeholder="What's on your mind?"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Checkbox}
                  name="is_public"
                  label="Public"
                  checked={this.state.is_public}
                  onClick={this.updatePublic}
                />
                <Form.Field control={Button}>Post</Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Feed>
              {this.posts()}
            </Feed>
          </Grid.Row>
        </Grid>
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
