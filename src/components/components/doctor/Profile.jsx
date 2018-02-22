import React from 'react';

import { CircularProgress } from 'material-ui/Progress';
import DoctorProfile from '../../views/DoctorProfile';

import { connect } from 'react-redux';

class Profile extends React.Component {

  render() {
    if (!this.props.fetching) {
      const profile = this.props.profile;
      const address = this.props.address;
      if (profile) {
        return <DoctorProfile profile={ profile } address={ address }/>
      }
      return null;
    }
    return (
      <CircularProgress size={ 50 }/>
    )

  }
}

const mapStateToProps = state => ({
  account: state.account.account,
  profile: state.account.profile,
  address: state.account.address,
  fetching: state.account.fetching
});

export default connect(mapStateToProps)(Profile);
