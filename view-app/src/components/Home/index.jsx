import React from 'react';
// import PropTypes from 'prop-types';

import { Image, Grid } from 'semantic-ui-react';

import './Home.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Home = () => (
  <div className="row">
    <Grid>
      <Grid.Row id="navbar">
        <Grid.Column width={6} padded>
          <h1 id="websitename">social-network-c137</h1>
        </Grid.Column>
        <Grid.Column width={10} padded>
          <SignIn signIn={() => {}} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={6} padded>
          <Image src="https://i.imgur.com/XOQHLsX.jpg" />
          <div id="rickquote">
            <h3> I turned myself into a social network, Morty!</h3>
            <h1> I am social network rick! </h1>
          </div>
        </Grid.Column>
        <Grid.Column width={10}>
          <SignUp signUp={() => {}} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

// Home.propTypes = {
//   authenticateUser: PropTypes.func.isRequired,
// };
export default Home;
