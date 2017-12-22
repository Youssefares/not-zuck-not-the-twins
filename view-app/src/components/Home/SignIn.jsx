import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Form } from 'semantic-ui-react';

import './Home.css';

// import { logIn, WrongUsernameError, WrongPasswordError } from '../../helpers/sessions';
// import { authenticateUser } from '../../helpers/auth';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <Form onSubmit={() => { this.props.signIn(this.state.email, this.state.password); }} >
        <Grid columns={3} padded>
          <Grid.Row verticleAlign="bottom">
            <Grid.Column>
              <Form.Input
                placeholder="Email"
                name="email"
                type="email"
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                placeholder="Password"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Button id="signin" type="submit">Log in</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  // onAuthSuccess: PropTypes.func.isRequired,
};
export default SignIn;
