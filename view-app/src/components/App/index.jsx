import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';
import HomeContainer from '../Home';
import Timeline from '../Timeline';
import ProfileContainer from '../Profile';
import Wrapper from '../Wrapper';

import { isUserAuthenticated, currentUser } from '../../helpers/auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: currentUser(),
    };
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }


  componentWillMount() {
    isUserAuthenticated().then((response) => {
      this.setState({ currentUser: response.status === 200 ? currentUser() : null });
    });
  }

  setCurrentUser() {
    this.setState({
      currentUser: currentUser(),
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => {
              if (this.state.currentUser == null) {
                return <HomeContainer onSignIn={this.setCurrentUser} />;
              }
              return <Redirect to="/timeline" />;
            }}
          />
          <Route
            path="/"
            render={() => {
              if (this.state.currentUser == null) {
                return <Redirect to="/login" />;
              }
              return <Wrapper currentUser={this.state.currentUser} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
