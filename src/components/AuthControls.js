
import React from 'react'

type Props = {
  onLogin: Function,
  onLogout: Function,
  loggedIn: boolean,
  profile: any // See https://auth0.com/docs/user-profile/normalized
};

/**
 * Dumb sample auth controls component that:
 * * Displays the current logged in user's nickname
 * * Presents either a login or logout button based on logged in state
 */
export default class AuthControls extends React.Component {

  props: Props;

  render() {
    const { onLogin, onLogout, loggedIn, profile } = this.props;
    return (
      <div>
        <span>{profile ? profile.get("nickname") : ""}</span>
          {
            loggedIn &&
            <button onClick={onLogout}>Logout</button>
          }
          {
            !loggedIn &&
            <button onClick={onLogin}>Login</button>
          }
      </div>
    )
  }
}
