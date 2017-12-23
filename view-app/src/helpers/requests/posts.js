import fetch from 'isomorphic-fetch';
import config from '../../config';
import { currentUserHeaders } from '../auth';
import { UserNotFound } from './users';

const apiUrl = `http://${config.API_HOST}:${config.API_PORT}`;

// content-headers + auth-headers
const headers = Object.assign({
  Accept: 'application/json',
  'Content-Type': 'application/json',
}, currentUserHeaders());


function getPosts(userId) {
  return fetch(`${apiUrl}/users/${userId}/posts`, {
    method: 'GET',
    headers,
    mode: 'cors',
  }).then((response) => {
    if (response.code === 404) {
      throw new UserNotFound(`No user found with id ${userId}`);
    }
    return response.json();
  });
}

function getFeed(userId) {
  return fetch(`${apiUrl}/users/${userId}/feed`, {
    method: 'GET',
    headers,
    mode: 'cors',
  }).then((response) => {
    if (response.code === 404) {
      throw new UserNotFound(`No user found with id ${userId}`);
    }
    return response.json();
  });
}

export { getPosts, getFeed };
