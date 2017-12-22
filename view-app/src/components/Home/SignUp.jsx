import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Input, Grid, Button, Radio, Form, TextArea } from 'semantic-ui-react';
import './Home.css';

// import { register, ValidationError } from '../../helpers/sessions';
// import { authenticateUser } from '../../helpers/auth';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      phoneNumberCount: 0,
      phoneNumbers: [''],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'phoneNumber') {
      this.state.phoneNumbers[event.target.id] = event.target.value;
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRadioChange(event, result) {
    this.setState({
      [result.name]: result.value,
    });
  }

  handleAdd(event) {
    event.preventDefault();
    if (this.state.phoneNumberCount > 3) {
      return;
    }
    this.setState({
      phoneNumberCount: this.state.phoneNumberCount + 1,
    });
    this.state.phoneNumbers.push('');
  }

  render() {
    const gender = this.state.gender === '' ? 'male' : this.state.gender;
    const phoneNumbers = [];
    for (let i = 1; i < this.state.phoneNumberCount + 1; i += 1) {
      phoneNumbers.push((
        <Grid.Row columns={3} className="extra phone">
          <Grid.Column>
            <Form.Field>
              <Form.Input
                name="phoneNumber"
                id={i}
                placeholder="ex: +201234567891"
                onChange={this.handleChange}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      ));
    }
    return (
      <Form onSubmit={() => { this.props.signUp(this.state); }} >
        <Grid columns={3} padded>
          <h1>Sign Up</h1>
          <Grid.Row>
            <Grid.Column>
              <Form.Input
                label="First Name"
                name="name"
                onChange={this.handleChange}
                required
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Last Name"
                name="last_name"
                onChange={this.handleChange}
                required
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Input
                label="Email"
                name="email"
                type="email"
                onChange={this.handleChange}
                required
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Username"
                name="nickname"
                onChange={this.handleChange}
                required
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Input
                label="Password"
                name="password"
                type="password"
                onChange={this.handleChange}
                required
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Confirm Password"
                name="confirm_password"
                type="password"
                onChange={this.handleChange}
                required
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
                  label="Other"
                  value="other"
                  checked={gender === 'other'}
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
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Input
                label="Birthday"
                name="birthdate"
                placeholder="mm/dd/yyyy"
                onChange={this.handleChange}
                required
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Home Town"
                name="hometown"
                onChange={this.handleChange}
                required
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3} className="phone">
            <Grid.Column>
              <Form.Group>
                <Form.Field>
                  <label htmlFor="phone number">
                    Phone Numbers
                    <Input
                      name="phoneNumber"
                      id={0}
                      placeholder="ex: +201234567891"
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>
              </Form.Group>
            </Grid.Column>
            <Button id="Add" animated onClick={this.handleAdd}>
              <Button.Content className="AddContent" visible>
                <Icon name="plus" />
              </Button.Content>
              <Button.Content className="AddContent" hidden>Add</Button.Content>
            </Button>
          </Grid.Row>
          {phoneNumbers}
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Field
                control={TextArea}
                name="about"
                label="About"
                placeholder="Tell us more about you..."
                onChange={this.handleChange}
              />
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
