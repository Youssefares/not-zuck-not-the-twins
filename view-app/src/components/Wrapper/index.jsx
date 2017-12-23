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
        render={() => (<Timeline
          currentUser={props.currentUser}
          currentName={props.currentName}
          currentImage={props.currentImage}
        />)}
      />
      <Route
        exact
        path="/me"
        render={() => (<ProfileContainer
          userId={props.currentUser}
          currentName={props.currentName}
          currentImage={props.currentImage}
        />)}
      />
      <Route render={() => <h1>Page not found</h1>} />
    </Switch>
  </Router>
);

Wrapper.propTypes = {
  currentUser: PropTypes.number.isRequired,
  currentName: PropTypes.string.isRequired,
  currentEmail: PropTypes.string.isRequired,
  currentImage: PropTypes.string.isRequired,

};
export default Wrapper;
