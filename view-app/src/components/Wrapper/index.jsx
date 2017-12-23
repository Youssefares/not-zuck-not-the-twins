import React from 'react';
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import './Wrapper.css';
import Timeline from '../Timeline';
import ProfileContainer from '../Profile';

const Wrapper = props => (
  <Router>
    <Switch>
      <Route
        exact
        path="/timeline"
        render={() => <Timeline />}
      />

      <Route
        exact
        path="/me"
        render={() => <ProfileContainer userId={props.currentUser} />}
      />
      <Route render={() => <h1>Page not found</h1>} />
    </Switch>
  </Router>
);

Wrapper.propTypes = {
  currentUser: PropTypes.number.isRequired,
};
export default Wrapper;
