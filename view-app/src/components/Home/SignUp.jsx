import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button, Radio, Form } from 'semantic-ui-react';
import './Home.css';

// import { register, ValidationError } from '../../helpers/sessions';
// import { authenticateUser } from '../../helpers/auth';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirm_password: '',
      gender: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRadioChange(event, result) {
    this.setState({
      [result.name]: result.value,
    });
  }

  render() {
    const gender = this.state.gender === '' ? 'male' : this.state.gender;
    return (
      <Form onSubmit={this.props.signUp(this.state)} >
        <Grid columns={3} padded>
          <h1>Sign Up</h1>
          <Grid.Row>
            <Grid.Column>
              <Form.Input label="Email" name="email" type="email" onChange={this.handleChange} />
            </Grid.Column>
            <Grid.Column>
              <Form.Input label="Username" name="username" onChange={this.handleChange} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Input
                label="Password"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Confirm Password"
                name="confirm_password"
                type="password"
                onChange={this.handleChange}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Form.Group inline>
                <label htmlFor="gender">
                Gender
                </label>
                <Form.Field
                  control={Radio}
                  name="gender"
                  label="Male"
                  value="male"
                  checked={gender === 'male'}
                  onChange={this.handleRadioChange}
                />
                <Form.Field
                  control={Radio}
                  name="gender"
                  label="Female"
                  value="female"
                  checked={gender === 'female'}
                  onChange={this.handleRadioChange}
                />
                <Form.Field
                  control={Radio}
                  name="gender"
                  label="Prefer not to specify"
                  value="prefer_not_to_specify"
                  checked={gender === 'prefer_not_to_specify'}
                  onChange={this.handleRadioChange}
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  // onAuthSuccess: PropTypes.func.isRequired,
};
export default SignUp;
