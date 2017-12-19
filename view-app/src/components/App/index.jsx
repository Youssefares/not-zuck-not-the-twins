import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.css';
import Home from '../Home';
// import { isUserAuthenticated, currentUser } from '../../helpers/auth';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  // authenticateUser() {
  //   isUserAuthenticated().then((response) => {
  //     this.setState({ signed_in: response.status === 200 });
  //     if (response.status === 200) {
  //       response.json().then((response) => {
  //         if (this.state.signed_in) {
  //           this.setState({ enrolled: response.department_id });
  //         }
  //       });
  //     }
  //   });
  // }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return (<Home/>);
                }}
              />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
