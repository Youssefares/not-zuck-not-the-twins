import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import Navbar from '../Navbar';

class TimelineContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Navbar 
          currentName={this.props.currentName}
          currentImage={this.props.currentImage}
        />
        <h1>Timeline</h1>
      </Grid>
    );
  }
}
TimelineContainer.propTypes = {
  currentUser: PropTypes.number.isRequired,
  currentName: PropTypes.string.isRequired,
  currentEmail: PropTypes.string.isRequired,
  currentImage: PropTypes.string.isRequired,
};
export default TimelineContainer;
