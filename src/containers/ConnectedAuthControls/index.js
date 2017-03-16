
import React, { PropTypes as T } from 'react'

import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';

import AuthControls from '../../components/AuthControls';

import { login, logout } from './actions';

import { makeSelectLoggedIn, makeSelectProfile } from './selectors';

export plugin from './plugin';

type Props = {
  onLogin: Function,
  onLogout: Function,
  loggedIn: boolean,
  profile: any
};

/**
 * Sample connected auth controls component.
 * Displays logged in user's nickname, and supports login & logout.
 */
export class ConnectedAuthControls extends React.Component {

  props: Props;

  render() {
    const { onLogin, onLogout, loggedIn, profile} = this.props;
    return (
        <AuthControls onLogin={onLogin} onLogout={onLogout} loggedIn={loggedIn} profile={profile}/>
    )
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onLogin: () => dispatch(login()),
    onLogout: () => dispatch(logout()),
  };
}

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  profile: makeSelectProfile()
});

// // Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ConnectedAuthControls);
