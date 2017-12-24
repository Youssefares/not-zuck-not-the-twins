import React from 'react';
import PropTypes from 'prop-types';

import { acceptFriendRequest, declineFriendRequest } from '../../helpers/requests/users';
import { Card, Button, Image } from 'semantic-ui-react';


class FriendRequest extends React.Component {
  constructor(props) {
    super(props);
  }

  accept() {

  }

  decline() {

  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={this.props.userImage} />
          <Card.Header>
            {this.props.userName} {this.props.userLastName}
          </Card.Header>
          <Card.Meta>
            {this.props.userEmail}
          </Card.Meta>
          <Card.Description>
            {this.props.userName} wants to <strong>become friends with you</strong>.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green' onClick={this.accept}>Approve</Button>
            <Button basic color='red' onClick={this.decline}>Decline</Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}
FriendRequest.propTypes = {
  currentUser: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  userLastName: PropTypes.string.isRequired,
  userImage: PropTypes.string,
};

FriendRequest.defaultProps = {
  userImage: '/user.png',
};

export default FriendRequest;
