import fetch from 'isomorphic-fetch';
import url from 'url';
import config from '../config';

const apiUrl = `http://${config.API_HOST}:${config.API_PORT}`;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Request-Method': 'POST',
  'Access-Control-Request-Headers': 'X-Requested-With',
};

function apiAuth(userHeaders) {
  return fetch(`${apiUrl}/auth/validate_token/${url.format({ query: userHeaders })}`, {
    method: 'GET',
    headers,
    mode: 'cors',
  });
}

function currentUser() {
  if (localStorage.getItem('currentUser') == null) {
    return null;
  }
  return JSON.parse(localStorage.getItem('currentUser'));
}

function currentUserHeaders() {
  return JSON.parse(localStorage.getItem('userHeaders'));
}

function setCurrentUser(userId) {
  localStorage.setItem('currentUser', userId);
}

function setUserHeaders(userHeaders) {
  localStorage.setItem('userHeaders', JSON.stringify(userHeaders));
}

function authenticateUser(token, onSuccess) {
  apiAuth(token).then(response => response.json()).then((response) => {
    if (response != null) {
      localStorage.setItem('currentUser', JSON.stringify(response));
      onSuccess();
    }
  });
}

function isUserAuthenticated() {
  if (currentUser() === null) {
    return Promise.resolve({ status: 401 });
  }
  return apiAuth(currentUserHeaders()).then(response => response);
}

function deauthenticateUser() {
  localStorage.removeItem('currentUser');
}


export {
  authenticateUser,
  setCurrentUser,
  setUserHeaders,
  deauthenticateUser,
  isUserAuthenticated,
  currentUser,
  currentUserHeaders
};
