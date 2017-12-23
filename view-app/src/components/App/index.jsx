import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';
import HomeContainer from '../Home';
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
      response.json().then((resp) => {
        this.setState({
          currentName: resp.data.name,
          currentEmail: resp.data.email,
          currentImage: resp.data.image,
        });
      });
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
              return (<Wrapper
                currentUser={this.state.currentUser}
                currentName={this.state.currentName}
                currentEmail={this.state.currentEmail}
                currentImage={this.state.currentImage}
              />);
            }}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
