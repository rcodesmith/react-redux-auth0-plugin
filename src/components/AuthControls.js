
import React from 'react'

// import { Button } from 'react-bootstrap'

type Props = {
  onLogin: Function,
  onLogout: Function,
  loggedIn: boolean,
  profile: any // See https://auth0.com/docs/user-profile/normalized
};

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
