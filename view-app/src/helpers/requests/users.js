import fetch from 'isomorphic-fetch';
import url from 'url';
import ExtendableError from 'es6-error';
import config from '../../config';
import { currentUserHeaders } from '../auth';


const apiUrl = `http://${config.API_HOST}:${config.API_PORT}`;
// content-headers + auth-headers
const headers = Object.assign({
  Accept: 'application/json',
  'Content-Type': 'application/json',
}, currentUserHeaders());

class UserNotFound extends ExtendableError {}

function showUser(id) {
  return fetch(`${apiUrl}/users/${id}`, {
    method: 'GET',
    headers,
    mode: 'cors',
  }).then((response) => {
    if (response.code === 404) {
      throw new UserNotFound(`No user found with id ${id}`);
    }
    return response.json();
  });
}

function requestFriend(id, friendId) {
  return fetch(`${apiUrl}/users/${id}/request_friendship/${url.format({ query: { friend_id: friendId } })}`, {
    method: 'POST',
    headers,
    mode: 'cors',
  }).then((response) => {
    if (response.code === 201) {
      response.json();
    }
  });
}


function friendRequests(id) {
  return fetch(`${apiUrl}/users/${id}/friend_requests/`, {
    method: 'GET',
    headers,
    mode: 'cors',
  }).then((response) => {
    return response.json();
  });
}

function acceptFriendRequest(id, friendId) {
  return fetch(`${apiUrl}/users/${id}/accept_friend_request/${url.format({ query: { friend_id: friendId } })}`, {
    method: 'POST',
    headers,
    mode: 'cors',
  }).then((response) => {
    if (response.code === 200) {
      response.json();
    }
  });
}

function declineFriendRequest(id, friendId) {
  return fetch(`${apiUrl}/users/${id}/delete_friendship/${url.format({ query: { friend_id: friendId } })}`, {
    method: 'POST',
    headers,
    mode: 'cors',
  }).then((response) => {
    if (response.code === 200) {
      response.json();
    }
  });
}

export {
  showUser,
  UserNotFound,
  requestFriend,
  friendRequests,
  acceptFriendRequest,
  declineFriendRequest,
};
