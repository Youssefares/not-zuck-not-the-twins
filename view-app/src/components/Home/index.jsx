import React from 'react';
import PropTypes from 'prop-types';

import Home from './Home';
import { register, logIn, ValidationError, AuthenticationError } from '../../helpers/sessions';
import { setCurrentUser, setUserHeaders } from '../../helpers/auth';


class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  signIn(email, password) {
    logIn(email, password).then((response) => {
      if (response.status === 401) {
        throw new AuthenticationError('wrong password for user');
      }
      this.handleResponse(response);
    }).catch((error) => {
      if (error instanceof AuthenticationError) {
        alert(error.message);
      }
    });
  }

  signUp(signUpData) {
    register(signUpData).then((response) => {
      if (response.status === 422) {
        throw new ValidationError('unable to create user with given data');
      }
      this.handleResponse(response);
    }).catch((error) => {
      if (error instanceof ValidationError) {
        alert(error.message);
      }
    });
  }

  handleResponse(response) {
    const onSuccess = this.props.onSignIn;
    const headers = {};
    headers.uid = response.headers.get('uid');
    headers.client = response.headers.get('client');
    headers['access-token'] = response.headers.get('access-token');
    response.json().then((body) => {
      setCurrentUser(body.data.id);
      onSuccess();
    });
    setUserHeaders(headers);
  }

  render() {
    return (
      <Home signIn={this.signIn} signUp={this.signUp} />
    );
  }
}

HomeContainer.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};
export default HomeContainer;
