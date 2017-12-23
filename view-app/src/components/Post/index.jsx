import React from 'react';
import PropTypes from 'prop-types';
import time from 'time-ago';

import { Icon, Feed } from 'semantic-ui-react';
import './Post.css';

const Post = props => (
  <Feed.Event>
    <Feed.Label image={props.userImage} />
    <Feed.Content>
      <Feed.Summary>
        <a>User #{props.userId}</a> posted on his page
        <Feed.Date>{time.ago(props.created_at)}</Feed.Date>
      </Feed.Summary>
      <Feed.Extra text>
        {props.body}
      </Feed.Extra>
      <Feed.Meta>
        <Feed.Like>
          <Icon name="like" />
          5 Likes
        </Feed.Like>
      </Feed.Meta>
    </Feed.Content>
  </Feed.Event>
);

Post.propTypes = {
  userId: PropTypes.number.isRequired,
  userImage: PropTypes.string,
  body: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
};

Post.defaultProps = {
  userImage: './user.png',
};

export default Post;
