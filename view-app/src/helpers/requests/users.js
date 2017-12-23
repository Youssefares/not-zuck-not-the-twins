import fetch from 'isomorphic-fetch';
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

export { showUser, UserNotFound };
