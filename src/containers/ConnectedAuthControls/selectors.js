/**
 * @flow
 */

import { createSelector } from 'reselect';

function selectLogin(state) : boolean {
  return state.get('login');
}

/**
 * Create selector for the logged-in state
 */
export const makeSelectLoggedIn = () => createSelector(
  selectLogin,
  (loginState: any) => loginState.get('loggedIn')
);

/**
 * Create selector for user profile.  See https://auth0.com/docs/user-profile/normalized
 */
export const makeSelectProfile = () => createSelector(
  selectLogin,
  (loginState: any) => loginState.get('profile')
);
