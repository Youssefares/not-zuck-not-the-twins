import React from 'react';
import PropTypes from 'prop-types';
import time from 'time-ago';
import { NavLink } from 'react-router-dom';

import { Icon, Feed } from 'semantic-ui-react';
import './Post.css';

const Post = props => (
  <Feed.Event>
    <Feed.Label image={props.userImage} />
    <Feed.Content>
      <Feed.Summary>
        <NavLink to={`/users/${props.userId}`}>{props.userNickname || props.userName}</NavLink> posted on his page
        <Feed.Date>{time.ago(props.created_at)}</Feed.Date>
        {props.isPublic ? null : <Icon name="lock" />}
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
  userName: PropTypes.string.isRequired,
  userNickname: PropTypes.string.isRequired,
  userImage: PropTypes.string,
  body: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
};

Post.defaultProps = {
  userImage: '/user.png',
};

export default Post;
