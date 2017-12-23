import fetch from 'isomorphic-fetch';
import ExtendableError from 'es6-error';
import config from '../config';

const apiUrl = `http://${config.API_HOST}:${config.API_PORT}`;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

class ValidationError extends ExtendableError {}
class AuthenticationError extends ExtendableError {}

function register(body) {
  return fetch(`${apiUrl}/auth/`, {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify(body),
  });
}

function logIn(email, password) {
  return fetch(`${apiUrl}/auth/sign_in`, {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export { register, logIn, ValidationError, AuthenticationError };
